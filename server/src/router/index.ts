import express, { Router } from 'express';
import InvoiceRouter from './../api/invoice/InvoiceRouter';

const router = Router();

router.use('/invoice', InvoiceRouter);

router.use(express.json());

export default router;
