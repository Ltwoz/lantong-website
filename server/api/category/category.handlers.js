const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const ApiFeatures = require("../../utils/apiFeatures");
const Category = require("./category.model");

// Create Category
exports.createCategory = catchAsyncErrors(async (req, res, next) => {
    const { name, isActive } = req.body;

    if (!name) {
        return res.status(400).json({ error: "You must enter name." });
    }

    const category = await Category.create({
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

// Update a Category
// exports.updateCategory = catchAsyncErrors(async (req, res, next) => {
//     const categoryId = req.params.id;
// })
