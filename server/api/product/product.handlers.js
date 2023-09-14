const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const ApiFeatures = require("../../utils/apiFeatures");
const Product = require("./product.model");
const Category = require("../category/category.model");
const multer = require("multer");
const { promisify } = require("util");
const { uploadFile, deleteFiles } = require("../../utils/s3");

// Create Product -- Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
    // Create a multer instance and configure it
    const storage = multer.memoryStorage();
    const uploadMiddleware = multer({ storage: storage }).any();
    const uploadMiddlewareAsync = promisify(uploadMiddleware);

    await uploadMiddlewareAsync(req, res);

    const files = req.files;

    const images = [];
    const videos = [];

    for (let i = 0; i < files.length; i++) {
        if (files[i].mimetype.startsWith("image")) {
            images.push(files[i]);
        } else if (files[i].mimetype.startsWith("video")) {
            videos.push(files[i]);
        }
    }

    const imageResult = await uploadFile(images, "products/images");
    const videoResult = await uploadFile(videos, "products/videos");

    const updateFiles = [];

    for (let i = 0; i < imageResult.length; i++) {
        updateFiles.push({
            public_id: imageResult[i].Key,
            url: imageResult[i].Location,
        });
    }

    for (let i = 0; i < videoResult.length; i++) {
        updateFiles.push({
            public_id: videoResult[i].Key,
            url: videoResult[i].Location,
        });
    }

    req.body.images = updateFiles;

    const product = await Product.create(req.body);

    // Count products in a category
    const categoryProductsCount = await Category.aggregate([
        {
            $lookup: {
                from: "products",
                localField: "_id",
                foreignField: "category",
                as: "products",
            },
        },
        {
            $addFields: {
                productsCount: { $size: "$products" },
            },
        },
    ]);

    // Update productsCount field to a category
    for (let category of categoryProductsCount) {
        await Category.findByIdAndUpdate(
            category._id,
            { productsCount: category.productsCount },
            {
                new: true,
                runValidators: true,
                useFindAndModify: false,
            }
        );
    }

    res.status(201).json({ success: true, product });
});

// Get Filter Products
exports.getFilterProducts = catchAsyncErrors(async (req, res, next) => {
    const resultPerPage = 21;
    const productsCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(
        Product.find().populate({
            path: "category",
            select: "name isActive",
        }),
        req.query
    )
        .search(["name", "productId"])
        .filter()
        .sort();

    let products = await apiFeature.query;

    let filteredProductsCount = products.length;

    apiFeature.pagination(resultPerPage);

    products = await apiFeature.query.clone();

    const totalPageCount = Math.ceil(filteredProductsCount / resultPerPage);

    res.status(200).json({
        success: true,
        products,
        filteredProductsCount,
        totalPageCount,
        productsCount,
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
        return res.status(404).json({ error: "No Product found." });
    }

    res.status(200).json({ success: true, product });
});

// Get All Products -- Admin
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
    const resultPerPage = 21;
    const productsCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(
        Product.find().populate({
            path: "category",
            select: "name isActive",
        }),
        req.query
    )
        .search(["name", "productId"])
        .filter()
        .sort();

    let products = await apiFeature.query;

    let filteredProductsCount = products.length;

    apiFeature.pagination(resultPerPage);

    products = await apiFeature.query.clone();

    const totalPageCount = Math.ceil(filteredProductsCount / resultPerPage);

    res.status(200).json({
        success: true,
        products,
        filteredProductsCount,
        totalPageCount,
        productsCount,
    });
});

// Get Detail Product -- Admin
exports.getAdminDetailProduct = catchAsyncErrors(async (req, res, next) => {
    const productId = req.params.id;

    const product = await Product.findOne({ _id: productId }).populate({
        path: "category",
        select: "name isActive",
    });

    if (!product) {
        return res.status(404).json({ error: "No Product found." });
    }

    res.status(200).json({ success: true, product });
});

// Update Product -- Admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    // Create a multer instance and configure it
    const storage = multer.memoryStorage();
    const uploadMiddleware = multer({ storage: storage }).any();
    const uploadMiddlewareAsync = promisify(uploadMiddleware);

    await uploadMiddlewareAsync(req, res);

    let product = await Product.findById(req.params.id);

    const files = req.files;

    // Images Array
    const oldImages = product.images || [];
    const currentImages = [];
    const updateFiles = [];

    // JSON Parse images if it's not undefined
    if (req.body.images !== undefined) {
        for (let i = 0; i < req.body.images.length; i++) {
            const image = req.body.images[i];
            currentImages.push(JSON.parse(image));
        }
    }

    // Check unmatched
    const unmatchedImages = oldImages.filter(
        (img) =>
            !currentImages.some((image) => image.public_id === img.public_id)
    );

    //Deleting Images From AWS S3
    await deleteFiles(unmatchedImages);

    const images = [];
    const videos = [];

    for (let i = 0; i < files.length; i++) {
        if (files[i].mimetype.startsWith("image")) {
            images.push(files[i]);
        } else if (files[i].mimetype.startsWith("video")) {
            videos.push(files[i]);
        }
    }

    // Upload Images
    const imageResult = await uploadFile(images, "products/images");
    const videoResult = await uploadFile(videos, "products/videos");

    for (let i = 0; i < currentImages.length; i++) {
        updateFiles.push({
            public_id: currentImages[i].public_id,
            url: currentImages[i].url,
        });
    }

    for (let i = 0; i < imageResult.length; i++) {
        updateFiles.push({
            public_id: imageResult[i].Key,
            url: imageResult[i].Location,
        });
    }

    for (let i = 0; i < videoResult.length; i++) {
        updateFiles.push({
            public_id: videoResult[i].Key,
            url: videoResult[i].Location,
        });
    }

    req.body.images = updateFiles;

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    // Count products in a category
    const categoryProductsCount = await Category.aggregate([
        {
            $lookup: {
                from: "products",
                localField: "_id",
                foreignField: "category",
                as: "products",
            },
        },
        {
            $addFields: {
                productsCount: { $size: "$products" },
            },
        },
    ]);

    // Update productsCount field to a category
    for (let category of categoryProductsCount) {
        await Category.findByIdAndUpdate(
            category._id,
            { productsCount: category.productsCount },
            {
                new: true,
                runValidators: true,
                useFindAndModify: false,
            }
        );
    }

    res.status(200).json({ success: true, product });
});

// Delete Product -- Admin
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        res.status(404).json({
            success: false,
            message: "Product not found.",
        });
    }

    //Deleting Images From AWS S3
    await deleteFiles(product.images);

    await product.remove();

    // Count products in a category
    const categoryProductsCount = await Category.aggregate([
        {
            $lookup: {
                from: "products",
                localField: "_id",
                foreignField: "category",
                as: "products",
            },
        },
        {
            $addFields: {
                productsCount: { $size: "$products" },
            },
        },
    ]);

    // Update productsCount field to a category
    for (let category of categoryProductsCount) {
        await Category.findByIdAndUpdate(
            category._id,
            { productsCount: category.productsCount },
            {
                new: true,
                runValidators: true,
                useFindAndModify: false,
            }
        );
    }

    res.status(200).json({ success: true, message: "Product deleted." });
});
