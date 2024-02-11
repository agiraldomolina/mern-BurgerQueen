import mongoose from 'mongoose';
import Product from '../models/product.model.js';
import mongooseAutopopulate from 'mongoose-autopopulate';
import User from '../models/user.model.js';

const productsOrderSchema = new mongoose.Schema(
  {
    qty: { type: Number, required: true },
    product: { 
      type: mongoose.Schema.ObjectId, 
      ref: 'Product', 
      required: true 
    },
  },
  { _id: false },
);


const orderSchema = new mongoose.Schema({
  user:{
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
    }
  },
  table: {
    type: Number,
    required: [true, 'Please write a table!'],
  },

  products: 
    [productsOrderSchema] 
  ,
  totalPrice:{
    type:Number,
    required:true,
    default:0.0,
},
  status: {
    type: String,
    default: 'pending',
    enum: ['pending', 'canceled', 'delivering', 'delivered'],
  },
  dataEntry: {
    type: Date,
    default: Date.now,
  },
  dateProcessed: Date,
},
// {
//   toJSON: { virtuals: true },
//   toObject: { virtuals: true },
// },
);

// Middleware that executes populate on each query
orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'products',
    populate: {
      path: 'product',
      model: Product,
      select: '-__v -_id -image -type'
    }
  });
  next();
});


orderSchema.plugin(mongooseAutopopulate);

orderSchema.pre('updateOne', async function (next) {
// Only run when status is modified
// console.log("hello from orderSchema pre save");
// console.log(this.isModified('client'));
// console.log(this.isNew);
  
  if (this.status === 'delivered') {
    console.log("hi there delivered");
    this.dateProcessed = Date.now();
    console.log(this);
  }
  next();
});

const Order = mongoose.model('Order', orderSchema);

export default Order;