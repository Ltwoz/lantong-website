const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Blog name cannot be empty"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Blog description cannot be empty"],
    },
    category: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone_no: {
        type: String,
        required: true
    },
    google_map: {
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
    videos: [
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
    numOfReviews: {
        type: Number,
        default: 0,
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            rating: {
                type: Number,
                required: true,
            },
            comment: {
                type: String,
                required: true,
            },
        },
    ],
    ratings: {
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

module.exports = mongoose.model("Blog", blogSchema);
