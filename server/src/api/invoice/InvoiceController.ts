import { Request, Response, NextFunction } from 'express';
import {
  createInvoiceService,
  getInvoiceService,
  getRevenueByDateRangeService,
  getRevenueInMonthService,
} from './InvoiceService';

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

export const getRevenue = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { dateRange, month } = req.body;
    // console.log('Req body:', req.body);

    console.log(month);

    if (!month) {
      const getRevenueResult = await getRevenueByDateRangeService({
        firstDate: dateRange.startDate,
        endDate: dateRange.endDate,
      });
      return res.status(201).send({
        error: false,
        message: 'OK',
        data: getRevenueResult,
      });
    } else {
      const getRevenueByMonth = await getRevenueInMonthService({ month });
      return;
    }
  } catch (error) {
    next(error);
  }
};
