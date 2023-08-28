const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    productId: {
        type: String,
        required: true,
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
        default: 0,
    },
    salePrice: {
        type: Number,
        maxLength: [10, "Sale price cannot exceed 10 characters"],
        default: 0,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },
    width: {
        type: String,
    },
    length: {
        type: String,
    },
    height: {
        type: String,
    },
    weightAccept: {
        type: String,
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
        default: true,
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
    isPopular: {
        type: Boolean,
        default: false,
    },
    isPromotion: {
        type: Boolean,
        default: false,
    },
    promotionDetail: {
        type: String,
    },
    isGift: {
        type: Boolean,
        default: false,
    },
    giftDetail: {
        type: String,
    },
    isOnSale: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Product", productSchema);
