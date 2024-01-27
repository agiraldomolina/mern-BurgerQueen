import  express  from "express";
import { verifyToken } from "../middlewares/verifyUser.js";
import { create } from "../controllers/order.controller.js";

const router = express.Router();

router.post('/create', verifyToken, create)

export default router;