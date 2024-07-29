import { prisma } from './../config/PrismaClient';

const main = async () => {
  await prisma.$transaction(async (tx) => {
    // Create the products
    await tx.product.createMany({
      data: [
        {
          product_name: 'Book',
          product_price: 10_000,
          stock: 20,
        },
        {
          product_name: 'Pencil',
          product_price: 15_000,
          stock: 25,
        },
        {
          product_name: 'Eraser',
          product_price: 8_000,
          stock: 40,
        },
      ],
    });

    // Fetch the products we just created by their names
    const products = await tx.product.findMany({
      where: {
        product_name: {
          in: ['Book', 'Pencil', 'Eraser'],
        },
      },
    });

    const productMap: { [key: string]: { id: number; product_price: number } } =
      {};

    products.forEach((product) => {
      productMap[product.product_name] = {
        id: product.id,
        product_price: product.product_price,
      };
    });

    await tx.invoice.createMany({
      data: [
        {
          customer_name: 'Nabil',
          order_date: new Date(),
          payment_type: 'CREDIT',
          product_id: productMap['Book'].id,
          quantity: 3,
          sales_person: 'Admin 1',
          total_price: 3 * productMap['Book'].product_price,
        },
        {
          customer_name: 'Nabil',
          order_date: new Date(),
          payment_type: 'CREDIT',
          product_id: productMap['Pencil'].id,
          quantity: 2,
          sales_person: 'Admin 1',
          total_price: 2 * productMap['Pencil'].product_price,
        },
        {
          customer_name: 'Nabil',
          order_date: new Date(),
          payment_type: 'CASH',
          product_id: productMap['Eraser'].id,
          quantity: 5,
          sales_person: 'Admin 1',
          total_price: 5 * productMap['Eraser'].product_price,
        },
        {
          customer_name: 'Given',
          order_date: new Date(),
          payment_type: 'NOTCASHORCREDIT',
          product_id: productMap['Pencil'].id,
          quantity: 5,
          sales_person: 'Admin 3',
          total_price: 5 * productMap['Pencil'].product_price,
        },
        {
          customer_name: 'Given',
          order_date: new Date(),
          payment_type: 'CASH',
          product_id: productMap['Eraser'].id,
          quantity: 5,
          sales_person: 'Admin 3',
          total_price: 5 * productMap['Eraser'].product_price,
        },
        {
          customer_name: 'Given',
          order_date: new Date(),
          payment_type: 'CASH',
          product_id: productMap['Book'].id,
          quantity: 5,
          sales_person: 'Admin 2',
          total_price: 5 * productMap['Book'].product_price,
        },
        {
          customer_name: 'Jeremy',
          order_date: new Date(),
          payment_type: 'NOTCASHORCREDIT',
          product_id: productMap['Pencil'].id,
          quantity: 5,
          sales_person: 'Admin 2',
          total_price: 5 * productMap['Pencil'].product_price,
        },
        {
          customer_name: 'Jeremy',
          order_date: new Date(),
          payment_type: 'CASH',
          product_id: productMap['Eraser'].id,
          quantity: 5,
          sales_person: 'Admin 2',
          total_price: 5 * productMap['Eraser'].product_price,
        },
      ],
    });
  });
};

main()
  .catch((error) => {
    console.log(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
