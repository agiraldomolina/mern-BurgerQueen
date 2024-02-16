import Order from '../models/order.model.js';
import {catchAsync} from '../utils/catchAsync.js';
import { errorHandler } from '../utils/error.js';
import User from '../models/user.model.js';

// @description create a new order
// @route POST /api/order
// @access Private
export const addOrderItems = catchAsync(async(req,res,next)=>{
    if (!req.user.isAdmin && !req.user.isWaiter && !req.user.isClient) return next(errorHandler(403, 'You are not authorized to perform this action'));

    //console.log('req.body from addOrder: '  + JSON.stringify(req.body));
    console.log ('email from addOrder: ' + req.user.email);
    console.log ('req user from addOrder: ' + JSON.stringify(req.user));
    

    const {
        table,
        products,
        itemsPrice,
        totalPrice,
    } = req.body;

    if (products && products.length === 0) {
      return next(errorHandler(400, 'Please add at least one item to order'));  
    }else{
        const order = new Order({
            products :products.map((item)=>({
                ...item,
                product:item._id,
                _id:undefined
            })),
            itemsPrice,
            totalPrice,
            table,
            user: {
                _id: req.user._id,
                email: req.user.email,

            }
        });
        const createdOrder = await order.save();

        res
            .status(201)
            .json(createdOrder);
    };
});

// @description Get logged in user's orders
// @route GET /api/order/myorders
// @access Private/waiter
export const getMyOrders = catchAsync(async(req,res,next)=>{
    // if (!req.user.isWaiter) return next(errorHandler(403, 'You are not authorized to perform this action'));
    // console.log('req.user from getMyOrders: ' + JSON.stringify(req.user._id));
    
    const orders = await Order
    .find({"user._id": req.user._id});

    res
      .status(200)
      .json(orders);
});

// @description Get order by ID
// @route GET /api/order/:id
// @access Private/ & Admin
export const getOrderById = catchAsync(async(req,res,next)=>{
    //check if user is logged in

    if (!req.user) return next(errorHandler(403, 'You are not authorized to perform this action'));
    
    const order = await Order
        .findById(req.params.id)
    

    if(order){
        res
            .status(200)
            .json(order);
    }else{
        res
          .status(404)
        return next(errorHandler(404, 'Order not found'));
    }
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
    if (!req.user.isAdmin && !req.user.chef) return next(errorHandler(403, 'You are not authorized to perform this action'));
    console.log('orderId: ' + req.params.orderId);

    const order = await Order.findById(req.params.id)
    
    console.log('order from updateToDelivered:'+ JSON.stringify(order));

    if (order) {
        order.status = 'delivered';
        order.dateProcessed = Date.now();
        const updatedOrder = await order.save();

        console.log('updatedOrder from updateToDelivered ok')

        res
          .status(200)
          .json(updatedOrder);
    }else{
        res.status(404)
        return next(errorHandler(404, 'Order not found'));
    }
    
});

export const updateStatus = catchAsync(async (req, res, next) => {
    if (!req.user) return next(errorHandler(403, 'You are not authorized to perform this action'));
    console.log('orderId from updateStatus: ' + req.params.id);

    const order = await Order.findById(req.params.id)
    const errorMessage = `You are not authorized to upadte status to ${req.body.status}`;

    if (!req.user.isAdmin && req.body.status === 'cancelled') return next(errorHandler(403, errorMessage));

    if (!req.user.isAdmin && !req.user.isChef && (req.body.status === 'preparing' || req.body.status === 'prepared')) return next(errorHandler(403, errorMessage));

    if(!req.user.isAdmin && !req.user.isWaiter && req.body.status === 'delivered') return next(errorHandler(403, errorMessage))

    if (order){
        order.status = req.body.status || order.status;
        order.status !== 'delivered'? order.dateProcessed ='': order.dateProcessed = Date.now();

        const updatedOrder = await order.save();

        res
          .status(200)
          .json(updatedOrder);
    }else{
        res.status(404)
        return next(errorHandler(404, `Cannot update order status to ${req.body.status}`));
    }
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
    // if (!req.user.isAdmin) return next(errorHandler(403, 'You are not authorized to perform this action'));
    // get all orders
    const orders = await Order
     .find()        
     
    res
        .status(200)
        .json(orders);   
});

// @description Delete  order by ID
// @route DELETE /api/order/:id
// @access Private/Admin
export const deleteOrderById= catchAsync(async(req,res,next)=>{
    if (!req.user.isAdmin) return next(errorHandler(403, 'You are not authorized to perform this action'));
    res.send('Deleted order by ID')
});
