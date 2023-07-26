const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const ApiFeatures = require("../../utils/apiFeatures");
const Product = require("./product.model");
const multer = require("multer");
const { promisify } = require("util");
const { uploadFile, deleteFiles } = require("../../utils/s3");

// Create Product -- Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
    // Create a multer instance and configure it
    const storage = multer.memoryStorage();
    const uploadMiddleware = multer({ storage: storage }).array("images");
    const uploadMiddlewareAsync = promisify(uploadMiddleware);

    await uploadMiddlewareAsync(req, res);

    const files = req.files;
    const result = await uploadFile(files, "products");

    const updateImages = [];

    for (let i = 0; i < result.length; i++) {
        updateImages.push({
            public_id: result[i].key,
            url: result[i].Location,
        });
    }

    req.body.images = updateImages;

    const product = await Product.create(req.body);

    res.status(201).json({ success: true, product });
});

// Get Filter Products
exports.getFilterProducts = catchAsyncErrors(async (req, res, next) => {
    const resultPerPage = 25;
    const productsCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(
        Product.find().populate({
            path: "category",
            select: "name isActive",
        }),
        req.query
    )
        .search()
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
    const resultPerPage = 25;
    const productsCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(
        Product.find().populate({
            path: "category",
            select: "name isActive",
        }),
        req.query
    )
        .search()
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
        return res.status(404).json({ error: "No Category found." });
    }

    res.status(200).json({ success: true, product });
});

// Update Product -- Admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    // Create a multer instance and configure it
    const storage = multer.memoryStorage();
    const uploadMiddleware = multer({ storage: storage }).array("files");
    const uploadMiddlewareAsync = promisify(uploadMiddleware);

    await uploadMiddlewareAsync(req, res);

    let product = await Product.findById(req.params.id);

    const files = req.files;
    // const result = await uploadFile(files, "products");

    // Images Array
    const oldImages = product.images || [];
    const currentImages = [];
    const updateImages = [];

    console.log(files);

    // JSON Parse images if it's not undefined
    if (req.body.images !== undefined) {
        for (let i = 0; i < req.body.images.length; i++) {
            const image = req.body.images[i];
            currentImages.push(JSON.parse(image));
        }
    }
    console.log("currentImages:", currentImages);

    // Check unmatched
    const unmatchedImages = oldImages.filter(
        (img) =>
            !currentImages.some(
                (image) => image.public_id === img.public_id
            )
    );
    console.log("unmatchedImages :", unmatchedImages);

    //Deleting Images From AWS S3
    await deleteFiles(unmatchedImages);

    // Upload Images
    const result = await uploadFile(files);

    if (currentImages.length === 0) {
        for (let i = 0; i < result.length; i++) {
            updateImages.push({
                public_id: result[i].key,
                url: result[i].Location,
            });
        }
    } else {
        // Push current images and push new images (if have)
        for (let i = 0; i < currentImages.length; i++) {
            updateImages.push({
                public_id: currentImages[i].public_id,
                url: currentImages[i].url,
            });
        }
        for (let i = 0; i < result.length; i++) {
            updateImages.push({
                public_id: result[i].key,
                url: result[i].Location,
            });
        }
    }

    req.body.images = updateImages;

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
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
