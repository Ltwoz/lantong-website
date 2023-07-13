const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    productId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: [true, "Product name cannot be empty"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Product description cannot be empty"],
    },
    price: {
        type: Number,
        required: [true, "Product price cannot be empty"],
        maxLength: [10, "Price cannot exceed 10 characters"],
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    images: [
        {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
        },
    ],
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Product", productSchema);