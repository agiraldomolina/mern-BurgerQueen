import Product from "../models/product.model.js"
import { catchAsync } from "../utils/catchAsync.js"
import { errorHandler } from "../utils/error.js";

export const createProduct = catchAsync(async (req, res, next) => {
    const newProduct = await Product.create(req.body);
    res
    .status(200)
    .json(newProduct);
})