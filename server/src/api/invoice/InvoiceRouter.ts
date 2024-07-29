import { Router } from 'express';
import { createInvoice, getInvoice } from './InvoiceController';

const router = Router();

router.get('/', getInvoice);
router.post('/', createInvoice);

export default router;
