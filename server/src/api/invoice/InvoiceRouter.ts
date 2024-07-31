import { Router } from 'express';
import { createInvoice, getInvoice, getRevenue } from './InvoiceController';

const router = Router();

router.get('/', getInvoice);
router.post('/', createInvoice);
router.post('/revenue', getRevenue);

export default router;
