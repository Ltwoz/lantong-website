const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const Category = require("./category.model");

// Create Category
exports.createCategory = catchAsyncErrors(async (req, res, next) => {
    const { name, products, isActive } = req.body;

    if (!name) {
        return res.status(400).json({ error: "You must enter name." });
    }

    const category = await Category.create({
        name,
        products,
        isActive,
    });

    res.status(201).json({ success: true, category });
});

// Get All Categories
exports.getAllCategories = catchAsyncErrors(async (req, res, next) => {
    const categories = await Category.find();

    res.status(200).json({ success: true, categories });
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
