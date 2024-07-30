import { Request, Response, NextFunction } from 'express';
import { getProductService } from './ProductService';

export const getProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const getProductResult = await getProductService();

    return res.status(200).send({
      error: false,
      message: 'Get Product',
      data: getProductResult,
    });
  } catch (error) {
    next(error);
  }
};
