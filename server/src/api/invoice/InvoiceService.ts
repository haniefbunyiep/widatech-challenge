import { prisma } from '../../config/PrismaClient';
import {
  CreateInvoiceParams,
  findProduct,
  ProductItem,
} from './InvoiceInterface';

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
          `Insufficient stock for ${findProduct[i].product_name} products `
        );
    }

    for (let i = 0; i < selected_product.length; i++) {
      await prisma.invoice.create({
        data: {
          order_date: new Date(),
          customer_name,
          payment_type,
          quantity: selected_product[i].quantity,
          sales_person,
          product_id: selected_product[i].product_id,
          total_price:
            selected_product[i].product_price * selected_product[i].quantity,
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
