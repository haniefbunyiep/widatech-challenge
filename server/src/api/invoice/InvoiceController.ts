import { Request, Response, NextFunction } from 'express';
import { createInvoiceService } from './InvoiceService';

export const createInvoice = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { customer_name, sales_person, selected_product, payment_type } =
      req.body;

    await createInvoiceService({
      customer_name,
      sales_person,
      selected_product,
      payment_type,
    });

    return res.status(201).send({
      error: false,
      message: 'Invoice Created',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
