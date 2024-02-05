import mongoose from "mongoose";

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