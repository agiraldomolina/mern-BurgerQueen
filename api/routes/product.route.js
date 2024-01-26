import express from 'express';
import { verifyToken } from '../middlewares/verifyUser.js';
import { createProduct, deleteProduct, getProducts } from '../controllers/product.controller.js';

const router = express.Router();

router.post('/create', verifyToken, createProduct);
router.delete('/delete/:productId', verifyToken, deleteProduct);
router.put('/update/:productId', verifyToken, updateProduct);
router.get('/get',getProducts)

export default router;