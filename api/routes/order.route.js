import  express  from "express";
import { verifyToken } from "../middlewares/verifyUser.js";
import { addOrderItems,
getMyOrders,
getOrderById,
getOrders,
updateStatus,
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
router.put('/:id/update-status', verifyToken, updateStatus);
router.put('/:id/cancel', verifyToken, updateOrderToCancelled);
router.put('/:id/delivered', verifyToken, updateOrderToDelivered);
router.put('/:id/delivering', verifyToken, updateOrderToDelivering);

export default router;