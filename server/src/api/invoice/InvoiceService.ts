import { prisma } from '../../config/PrismaClient';
import { CreateInvoiceParams, findProduct } from './InvoiceInterface';

export const createInvoiceService = async ({
  customer_name,
  sales_person,
  selected_product,
  payment_type,
}: CreateInvoiceParams) => {
  await prisma.$transaction(async (prisma) => {
    const findProduct: findProduct[] = [];
    for (let item of selected_product) {
      const findProductById = await prisma.product.findUnique({
        where: {
          id: item.product_id,
        },
      });
      if (!findProductById)
        throw new Error(`Product for id ${item.product_id} doesn't exist`);
      findProduct.push(findProductById as findProduct);
    }

    for (let i = 0; i < selected_product.length; i++) {
      if (selected_product[i].quantity > findProduct[i].stock)
        throw new Error(
          `Insufficient stock for ${findProduct[i].product_name} products stock ${findProduct[i].stock} `
        );
    }

    for (let i = 0; i < selected_product.length; i++) {
      await prisma.invoice.create({
        data: {
          order_date: new Date(),
          customer_name,
          payment_type,
          quantity: Number(selected_product[i].quantity),
          sales_person,
          product_id: selected_product[i].product_id,
          total_price:
            findProduct[i].product_price * selected_product[i].quantity,
        },
      });

      await prisma.product.update({
        where: {
          id: selected_product[i].product_id,
        },
        data: {
          stock: findProduct[i]?.stock! - selected_product[i].quantity,
        },
      });
    }
  });
};

export const getInvoiceService = async (pageNumber: number) => {
  const LIMIT_PAGE = 5;

  const findAllInvoice = await prisma.invoice.findMany();

  const totalPage = Math.ceil(findAllInvoice.length / LIMIT_PAGE);

  const getInvoiceData = await prisma.invoice.findMany({
    include: {
      product: true,
    },
    skip: (Number(pageNumber) - 1) * LIMIT_PAGE,
    take: LIMIT_PAGE,
    orderBy: {
      order_date: 'desc',
    },
  });

  return {
    totalPage,
    getInvoiceData,
  };
};

export const getRevenueByDateRangeService = async ({
  firstDate,
  endDate,
}: {
  firstDate: string;
  endDate: string;
}) => {
  // console.log(firstDate);
  const allProducts = await prisma.product.findMany({
    select: {
      id: true,
      product_name: true,
    },
  });

  const productIdToName = new Map<number, string>();
  for (const product of allProducts) {
    productIdToName.set(product.id, product.product_name);
  }

  const salesData = await prisma.invoice.groupBy({
    by: ['order_date', 'product_id'],
    _sum: {
      quantity: true,
    },
    where: {
      order_date: {
        gte: new Date(firstDate),
        lt: new Date(endDate),
      },
    },
  });

  const formattedData: { [key: string]: any } = {};

  for (const sale of salesData) {
    const date = sale.order_date.toISOString().split('T')[0];
    if (!formattedData[date]) {
      formattedData[date] = {
        date,
      };
    }
    const productName = productIdToName.get(sale.product_id);
    if (productName) {
      formattedData[date][productName] = sale._sum.quantity ?? 0;
    }
  }

  for (const date of Object.keys(formattedData)) {
    for (const [productId, productName] of productIdToName.entries()) {
      if (!(productName in formattedData[date])) {
        formattedData[date][productName] = 0;
      }
    }
  }

  const result = Object.values(formattedData);
  result.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  return result;
};

export const getRevenueInMonthService = async ({
  month,
}: {
  month: string;
}) => {
  const currentMonth = new Date();

  // Get the first date of the given month
  const firstDate = `${currentMonth.getFullYear()}-${String(month).padStart(
    2,
    '0'
  )}-01`;

  // Compute the next month's date
  const nextMonth = (Number(month) % 12) + 1;
  const nextYear =
    Number(month) === 12
      ? currentMonth.getFullYear() + 1
      : currentMonth.getFullYear();

  const nextMonthDate = new Date(nextYear, nextMonth - 1, 1);
  const endDate = `${nextMonthDate.getFullYear()}-${String(
    nextMonthDate.getMonth() + 1
  ).padStart(2, '0')}-01`;

  // console.log(firstDate); // Output: 2024-02-01 (example)
  // console.log(endDate); // Output: 2024-03-01 (example)

  const groupedData = await prisma.invoice.groupBy({
    by: ['product_id'],
    _sum: {
      quantity: true,
    },
    where: {
      order_date: {
        gte: new Date(firstDate),
        lt: new Date(endDate),
      },
    },
  });

  const productIds = groupedData.map((item) => item.product_id);
  const products = await prisma.product.findMany({
    where: {
      id: { in: productIds },
    },
  });

  const result = groupedData.map((item) => {
    const product = products.find((p) => p.id === item.product_id);
    return {
      name: product ? product.product_name : 'Unknown',
      total_quantity: item._sum.quantity,
    };
  });

  // console.log(result);

  return result;
};
