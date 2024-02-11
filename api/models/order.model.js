import mongoose from 'mongoose';
import Product from '../models/product.model.js';
import User from '../models/user.model.js';

const orderSchema = new mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
},
  table: {
    type: Number,
    required: [true, 'Please write a table!'],
  },

  products: [
    {
      name:{type:String,required:true},
      qty:{type:Number,required:true},
      price:{type:Number,required:true},
      image:{type:String,required:true},
      product:{
          type:mongoose.Schema.Types.ObjectId,
          ref:"Product",
          required:true
      },
  }
  ]
    
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
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
},
);

// Middleware that executes populate on each query
// orderSchema.pre(/^find/, function (next) {
//   this .populate({
//     path: 'user',
//     model: User,
//    })
  // .populate({
  //   path: 'products',
  //   populate: {
  //     path: 'product',
  //     model: Product,
  //     select: '-__v -_id -image -type'
  //   }
  // });
//   next();
// });

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