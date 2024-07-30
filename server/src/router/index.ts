import express, { Router } from 'express';
import InvoiceRouter from './../api/invoice/InvoiceRouter';
import ProductRouter from './../api/product/ProductRouter';

const router = Router();

router.use('/invoice', InvoiceRouter);
router.use('/product', ProductRouter);

router.use(express.json());

export default router;
