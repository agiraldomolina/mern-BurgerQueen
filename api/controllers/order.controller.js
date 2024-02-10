import Order from '../models/order.model.js';
import {catchAsync} from '../utils/catchAsync.js';
import { errorHandler } from '../utils/error.js';

// @description create a new order
// @route POST /api/order
// @access Private
export const addOrderItems = catchAsync(async(req,res,next)=>{
    if (!req.user.isAdmin && !req.user.isWaiter) return next(errorHandler(403, 'You are not authorized to perform this action'));
    res.send('add order items')
});

// @description Get logged in user's orders
// @route GET /api/order/myorders
// @access Private/waiter
export const getMyOrders = catchAsync(async(req,res,next)=>{
    if (!req.user.isWaiter) return next(errorHandler(403, 'You are not authorized to perform this action'));
    res.send('get my orders')
    });

// @description Get order by ID
// @route GET /api/order/:id
// @access Private/ & Admin
export const getOrderById = catchAsync(async(req,res,next)=>{
    if (!req.user.isAdmin) return next(errorHandler(403, 'You are not authorized to perform this action'));
    res.send('get order by id')
    });

// @description Update order to cancelled
// @route GET /api/order/:id/canceled
// @access Private/Admin
export const updateOrderToCancelled = catchAsync(async(req,res,next)=>{
    if (!req.user.isAdmin) return next(errorHandler(403, 'You are not authorized to perform this action'));
    res.send('update order to canceled')
    });

// @description Update order to delivered
// @route GET /api/order/:id/delivered
// @access Private/admin &chef
export const updateOrderToDelivered= catchAsync(async(req,res,next)=>{
    if (!req.user.isAdmin && !req.user.isWaiter) return next(errorHandler(403, 'You are not authorized to perform this action'));
    res.send('update order to delivered')
    });

// @description Update order to delivering
// @route PUT /api/orders/:id/delivering
// @access Private/admin &chef
export const updateOrderToDelivering= catchAsync(async(req,res,next)=>{
    if (!req.user.isAdmin && !req.user.isChef) return next(errorHandler(403, 'You are not authorized to perform this action'));
    res.send('update order to delivering')
    });

// @description Get all orders
// @route GET /api/order
// @access Private/Admin
export const getOrders= catchAsync(async(req,res,next)=>{
    if (!req.user.isAdmin) return next(errorHandler(403, 'You are not authorized to perform this action'));
    res.send('Get all orders')
    });

// @description Delete  order by ID
// @route DELETE /api/order/:id
// @access Private/Admin
export const deleteOrderById= catchAsync(async(req,res,next)=>{
    if (!req.user.isAdmin) return next(errorHandler(403, 'You are not authorized to perform this action'));
    res.send('Deleted order by ID')
    });
