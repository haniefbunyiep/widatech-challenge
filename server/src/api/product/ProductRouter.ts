import { Router } from 'express';
import { getProduct, getProductById } from './ProductController';

const router = Router();

router.get('/', getProduct);
router.get('/detail', getProductById);

export default router;
