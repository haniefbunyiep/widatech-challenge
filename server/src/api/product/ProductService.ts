import { prisma } from '../../config/PrismaClient';

export const getProductService = async (name: string) => {
  if (name) {
    const findProductByName = await prisma.product.findMany({
      where: {
        product_name: {
          contains: name,
        },
      },
    });

    if (findProductByName.length == 0) throw new Error('Product not found');
    return findProductByName;
  }
  return await prisma.product.findMany();
};

export const getProductByIdService = async (productId: number) => {
  return await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });
};
