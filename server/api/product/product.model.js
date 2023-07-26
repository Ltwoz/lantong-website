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
    salePrice: {
        type: Number,
        maxLength: [10, "Sale price cannot exceed 10 characters"],
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    width: {
        type: Number,
        required: [true, "Product width cannot be empty"],
    },
    length: {
        type: Number,
        required: [true, "Product length cannot be empty"],
    },
    height: {
        type: Number,
        required: [true, "Product length cannot be empty"],
    },
    weightAccept: {
        type: Number,
        required: [true, "Product weight cannot be empty"],
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
    isFeatured: {
        type: Boolean,
        default: false
    },
    isGift: {
        type: Boolean,
        default: false
    },
    giftDetail: {
        type: String,
    },
    isOnSale: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Product", productSchema);