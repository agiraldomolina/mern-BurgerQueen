import express from 'express';
import { verifyToken } from '../middlewares/verifyUser.js';
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct, getTopProducts } from '../controllers/product.controller.js';

const router = express.Router();

router.post('/create', verifyToken, createProduct);
router.get('/top', getTopProducts);
router.delete('/delete/:productId', verifyToken, deleteProduct);
router.put('/update/:productId', verifyToken, updateProduct);
router.get('/',getProducts),
router.get('/:id', getProductById);

export default router;