const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const ApiFeatures = require("../../utils/apiFeatures");
const Product = require("./product.model");

// Create Product -- Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
    const { productId, name, description, price, isActive, category } =
        req.body;

    const product = await Product.create({
        productId,
        name,
        description,
        price,
        category,
        isActive,
    });

    res.status(201).json({ success: true, product });
});

// Get Filter Products
exports.getFilterProducts = catchAsyncErrors(async (req, res, next) => {
    const resultPerPage = 5;
    const productsCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()
        .sort();

    let products = await apiFeature.query;

    let filteredProductsCount = products.length;

    apiFeature.pagination(resultPerPage);

    res.status(200).json({
        success: true,
        products,
        productsCount,
        filteredProductsCount
    });
});

// Get Detail Product
exports.getDetailProduct = catchAsyncErrors(async (req, res, next) => {
    const productId = req.params.id;

    const product = await Product.findOne({ _id: productId }).populate({
        path: "category",
        select: "name isActive",
    });

    if (!product) {
        return res.status(404).json({ error: "No Category found." });
    }

    res.status(200).json({ success: true, product });
});

// Get All Products -- Admin
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
    const products = await Product.find();

    res.status(200).json({ success: true, products });
});

// Update Product -- Admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    const productId = req.params.id;

    const product = await Product.findByIdAndUpdate(productId, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({ success: true, product });
});

// Delete Product -- Admin
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const productId = req.params.id;

    await Product.deleteOne({ _id: productId });

    res.status(200).json({ success: true, message: "Product deleted." });
});
