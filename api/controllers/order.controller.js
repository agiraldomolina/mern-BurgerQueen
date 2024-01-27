import Order from '../models/order.model.js';
import {catchAsync} from '../utils/catchAsync.js';
import { errorHandler } from '../utils/error.js';

export const create= catchAsync(async (req, res,next) => {
    console.log(req.user.isWaiter);
    console.log(req.user.isAdmin);
    if (!req.user.isWaiter && !req.user.isAdmin) return next( errorHandler(401, 'Unauthorized'));
    const order = await Order.create(req.body);
    res
    .status(201)
    .json(order)
})