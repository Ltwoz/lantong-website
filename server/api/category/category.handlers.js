const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const ApiFeatures = require("../../utils/apiFeatures");
const Category = require("./category.model");
const Product = require("../product/product.model");
const { deleteFiles } = require("../../utils/s3");

// Create Category
exports.createCategory = catchAsyncErrors(async (req, res, next) => {
    const { categoryId, name, isActive } = req.body;

    if (!name) {
        return res.status(400).json({ error: "You must enter name." });
    }

    const category = await Category.create({
        categoryId,
        name,
        isActive,
    });

    res.status(201).json({ success: true, category });
});

// Get All Categories
exports.getAllCategories = catchAsyncErrors(async (req, res, next) => {
    const categories = await Category.find();

    res.status(200).json({ success: true, categories });
});

// Get All Categories -- Admin
exports.getAdminCategories = catchAsyncErrors(async (req, res, next) => {
    const resultPerPage = 25;
    const categoriesCount = await Category.countDocuments();

    const apiFeature = new ApiFeatures(
        Category.find(),
        req.query
    )
        .search()
        .filter()
        .sort();

    let categories = await apiFeature.query;

    let filteredCategoriesCount = categories.length;

    apiFeature.pagination(resultPerPage);

    categories = await apiFeature.query.clone();

    // Count products in a category
    const categoryProductsCount = await Category.aggregate([
        {
            $lookup: {
                from: "products",
                localField: "_id",
                foreignField: "category",
                as: "products"
            }
        },
        {
            $addFields: {
                productsCount: { $size: "$products" }
            }
        }
    ]);

    // Update productsCount field to a category
    for (let category of categoryProductsCount) {
        await Category.findByIdAndUpdate(category._id, { productsCount: category.productsCount }, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });
    }

    const totalPageCount = Math.ceil(filteredCategoriesCount / resultPerPage);

    res.status(200).json({
        success: true,
        categories,
        filteredCategoriesCount,
        totalPageCount,
        categoriesCount
    });
});

// Get Category Detail
exports.getDetailCategory = catchAsyncErrors(async (req, res, next) => {
    const categoryId = req.params.id;

    const category = await Category.findOne({ _id: categoryId });

    if (!category) {
        return res.status(404).json({ error: "No Category found." });
    }

    res.status(200).json({ success: true, category });
});

// Get Category Detail -- Admin
exports.getAdminDetailCategory = catchAsyncErrors(async (req, res, next) => {
    const categoryId = req.params.id;

    const category = await Category.findOne({ _id: categoryId });

    if (!category) {
        return res.status(404).json({ error: "No Category found." });
    }

    res.status(200).json({ success: true, category });
});

// Update Category -- Admin
exports.updateCategory = catchAsyncErrors(async (req, res, next) => {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({ success: true, category });
})

// Delete Category -- Admin
exports.deleteCategory = catchAsyncErrors(async (req, res, next) => {
    const category = await Category.findById(req.params.id);

    if (!category) {
        res.status(404).json({
            success: false,
            message: "Category not found.",
        });
    }

    // Delete products associated with the category
    // Find products associated with the category
    const products = await Product.find({ category: category._id });

    // Deleting Images From AWS S3
    for (let product of products) {
        await deleteFiles(product.images);
    }
    // Delete from database
    await Product.deleteMany({ category: category._id });

    // Delete the category itself
    await category.remove();

    res.status(200).json({ success: true, message: "Category deleted." });
});
