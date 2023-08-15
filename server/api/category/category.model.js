const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
    categoryId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: [true, "Category name cannot be empty"],
    },
    productsCount: {
        type: Number,
        default: 0,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Category", categorySchema);
