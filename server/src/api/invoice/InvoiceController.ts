import { Request, Response, NextFunction } from 'express';
import { createInvoiceService, getInvoiceService } from './InvoiceService';

export const createInvoice = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { customer_name, sales_person, selected_product, payment_type } =
      req.body;

    console.log(req.body);

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

export const getInvoice = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { currentPage } = req.query;

    const { totalPage, getInvoiceData } = await getInvoiceService(
      Number(currentPage)
    );

    return res.status(200).send({
      error: false,
      message: 'Get Invoice',
      data: {
        invoiceData: getInvoiceData,
        totalPage,
      },
    });
  } catch (error) {
    next(error);
  }
};
