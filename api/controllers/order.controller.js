import Order from '../models/order.model.js';
import {catchAsync} from '../utils/catchAsync.js';
import { errorHandler } from '../utils/error.js';

export const create= catchAsync(async (req, res,next) => {
    console.log(req.user.isWaiter);
    console.log(req.user.isAdmin);
    console.log(req.user._id);
    if (!req.user.isWaiter && !req.user.isAdmin) return next( errorHandler(401, 'Unauthorized'));
    if (!req.body.user) req.body.user = req.user._id;
    const order = await Order.create(req.body);
    res
    .status(201)
    .json(order)
})

export const getOrders = catchAsync(async (req, res, next) => {
    if (!req.user.isWaiter && !req.user.isChef && !req.user.isAdmin) return next( errorHandler(401, 'Unauthorized'));
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const sortBy = req.query.sortBy || 'createdAt';
    const sortDirection = req.query.order === 'asc'? 'asc' : 'desc';

    //const searchTermRegex = new RegExp(req.query.searchTerm, 'i');

    const orders = await Order.find({
        ...(req.query.orderId && {_id: req.query.orderId}),
        ...(req.query.client && {client: req.query.client}),
        ...(req.query.user && {user: req.query.user}),
        ...(req.query.status && {status: req.query.status}),
        ...(req.query.products && {'products.product': req.query.products}),
    })
    .sort([[sortBy, sortDirection]])
    .skip(startIndex)
    .limit(limit);

    const totalOrders = await Order.countDocuments();

    res
    .status(200)
    .json({
        orders,
        totalOrders
    })
    
//     const orders = await Order.find();
//     res
//   .status(200)
//   .json(orders)
})