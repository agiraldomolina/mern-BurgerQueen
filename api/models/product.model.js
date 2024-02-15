import mongoose from "mongoose";

const reviewsSchema = new mongoose.Schema({
  user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true
  },
  name:{
      type:String,
      required:true
  },
  rating:{
      type:Number,
      required:true
  },
  comment:{
      type:String,
      required:true
  }    
},{
  timestamps:true
})

const producSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'A product must have a name'],
      unique: true,
      maxLength: [50, 'A product name cannot be more than 50 characters'],
      minLength: [3, 'A product name must be at least 3 characters']
    },
    price:{
      type: Number,
      required: [true, 'A product must have a price'],
      min: [1, 'A product price must be at least 1'],
    },
    image:{
      type: String,
    },
    type:{
      type: String,
      required: [true, 'A product must have a type'],
      enum:{
        values :['breakfast', 'lunch', 'dinner', 'dessert','slide', 'beverage'],
        message:'Type must be either breakfast, lunch or dinner'
      }
    },
    description:{
      type: String,
      trim: true,
    },
    available: {
      type: Boolean,
      required: [true, 'A product must have an availability'],
      default: true
    },
    reviews:[reviewsSchema],
    rating:{
        type:Number,
        required:true,
        default:0
    },
    numReviews:{
        type:Number,
        required:true,
        default:0
    },
    slug:{
      type: String,
      required: true,
      unique: true,
    },
    dateEntry:{
      type: Date,
      default: Date.now,
      select: false
    }
  }, {timestamps: true});
  
  const Product = mongoose.model('product', producSchema);

export default Product;