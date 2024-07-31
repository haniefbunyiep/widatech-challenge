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

const month = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
];

export const getRevenue = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // console.log('Request body :', req.body);

    const { dateRange } = req.body;
    console.log(dateRange);

    // console.log(!dateRange.startDate);
    // let getCurrentDate = new Date();
    // let currentDateToISOString = getCurrentDate.toISOString();
    // let processDate = currentDateToISOString.split('-', 2).toString();

    // const currentMonth = processDate.split(',')[1];
    // const currentYear = processDate.split(',')[0];

    // let firstDate = `${currentYear}-${currentMonth}-01`;

    // let nextMonth = parseInt(currentMonth) + 1;
    // let nextYear = parseInt(currentYear);

    // if (nextMonth > 12) {
    //   nextMonth = 1;
    //   nextYear += 1;
    // }

    // let endDate = `${nextYear}-${nextMonth.toString().padStart(2, '0')}-01`;

    // console.log(firstDate);
    // console.log(endDate);

    const getRevenueResult = await getRevenueByDateRangeService({
      firstDate: dateRange.startDate,
      endDate: dateRange.endDate,
    });
    return res.status(201).send({
      error: false,
      message: 'OK',
      data: getRevenueResult,
    });
  } catch (error) {
    next(error);
  }
};
