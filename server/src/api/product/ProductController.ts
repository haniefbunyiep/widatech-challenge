import { Request, Response, NextFunction } from 'express';
import { getProductService, getProductByIdService } from './ProductService';

export const getProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.query;

    const getProductResult = await getProductService(name as string);

    return res.status(200).send({
      error: false,
      message: 'Get Product',
      data: getProductResult,
    });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId } = req.query;

    const getProductResult = await getProductByIdService(Number(productId));

    return res.status(200).send({
      error: false,
      message: 'Get Product By Id',
      data: getProductResult,
    });
  } catch (error) {
    next(error);
  }
};
