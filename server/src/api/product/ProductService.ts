import { prisma } from '../../config/PrismaClient';

export const getProductService = async () => {
  return await prisma.product.findMany();
};
