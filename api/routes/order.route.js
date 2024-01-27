import  express  from "express";
import { verifyToken } from "../middlewares/verifyUser.js";
import { create, getOrders } from "../controllers/order.controller.js";

const router = express.Router();

router.post('/create', verifyToken, create)
router.get('/get', verifyToken, getOrders) 

export default router;