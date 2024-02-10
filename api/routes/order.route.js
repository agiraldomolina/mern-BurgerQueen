import  express  from "express";
import { verifyToken } from "../middlewares/verifyUser.js";
import { addOrderItems,
getMyOrders,
getOrderById,
getOrders,
updateOrderToCancelled,
updateOrderToDelivered,
updateOrderToDelivering,
deleteOrderById,
    } from "../controllers/order.controller.js";

const router = express.Router();

router.post('/', verifyToken, addOrderItems)
router.get('/', verifyToken, getOrders)
router.delete('/:id', verifyToken, deleteOrderById);
router.get('/myorders', verifyToken, getMyOrders);
router.get('/:id', verifyToken, getOrderById);
router.put('/:id/cancel', verifyToken, updateOrderToCancelled);
router.put('/:orderId/delivered', verifyToken, updateOrderToDelivered);
router.put('/:orderId/delivering', verifyToken, updateOrderToDelivering);

export default router;