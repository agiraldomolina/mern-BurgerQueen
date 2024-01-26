import express from 'express';
import { verifyToken } from '../middlewares/verifyUser.js';
import { createProduct, getProducts } from '../controllers/product.controller.js';

const router = express.Router();

router.post('/create', verifyToken, createProduct);
router.get('/get',getProducts)

export default router;