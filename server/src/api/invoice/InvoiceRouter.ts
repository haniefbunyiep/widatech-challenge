import { Router } from 'express';
import { createInvoice } from './InvoiceController';

const router = Router();

router.post('/', createInvoice);

export default router;
