import Product from "../models/product.model.js"
import { catchAsync } from "../utils/catchAsync.js"
import { errorHandler } from "../utils/error.js";

export const createProduct = catchAsync(async (req, res, next) => {
    if (!req.user.isAdmin) return next(new AppError('You are not authorized to create products', 401));

    const slug = req.body.name
    .split(' ')
    .join('-')
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g,'-');

    const newProduct = new Product({
        ...req.body,slug,available: true
    })
    const saveProduct = await newProduct.save();
    res
    .status(201)
    .json(saveProduct);
});

export const deleteProduct= catchAsync(async (req, res, next) => {
    if (!req.user.isAdmin) return next(new AppError('You are not authorized to delete products', 401));

    await Product.findByIdAndDelete(req.params.productId)
    res
    .status(200)
    .json('Product deleted successfully');
});

export const updateProduct = catchAsync(async (req, res, next) => {
    console.log('is admin: ', req.user.isAdmin)
    if (!req.user.isAdmin) return next(new AppError('You are not authorized to update products', 401));

    const updatedProduct = await Product.findByIdAndUpdate(
        req.params.productId,
        {
            $set:{
                name: req.body.name,
                price: req.body.price,
                image: req.body.image,
                type: req.body.type,
                description: req.body.description,
                available: req.body.available,
            },
        }, {new: true}
    );
    res
    .status(200)
    .json(updatedProduct);
});

// @description fetch all products
// @route GET /api/products
// @access public
// export const getProducts = catchAsync(async (req, res, next) => {
//     const products = await Product.find({});
//     res.json(products);
// });

// @description fetch a product
// @route GET /api/products/:id
// @access public
export const getProductById = catchAsync(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    res.json(product);
})

export const getProducts = catchAsync(async (req, res, next) => {
    //console.log('req.query from getProduts:' + JSON.stringify (req.query));
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const sortDirection = req.query.order === 'asc'? 1 : -1;

    const projection ={
        name: 1,
        price: 1,
        image: 1,
        type: 1,
        description: 1,
        available: 1,
        slug: 1,
        dateEntry: 1,
    }

    const products = await Product.find({
        ...(req.query.type && {type: req.query.type}),
        ...(req.query.slug && {slug: req.query.slug}),
        ...(req.query.productId && {_id: req.query.productId}),
        ...(req.query.searchTerm && {
            $or:[
                {name: { $regex: req.query.searchTerm, $options: 'i' }},
                {description: { $regex: req.query.searchTerm, $options: 'i' }},
            ],
        }),
    },
    projection
    )
    .sort({dateEntry: sortDirection})
    .skip(startIndex)
    .limit(limit);

    const totalProducts = await Product.countDocuments();

    res
    .status(200)
    .json({
        products,
        totalProducts
    })
    //console.log(products);
});
