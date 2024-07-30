import { Router } from 'express';
import { getProduct } from './ProductController';

const router = Router();

router.get('/', getProduct);

export default router;
