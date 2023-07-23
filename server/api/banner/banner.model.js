const mongoose = require("mongoose");

const bannerSchema = mongoose.Schema({
    label: {
        type: String,
    },
    description: {
        type: String,
    },
    public_id: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    isOverlay: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Banner", bannerSchema);
