const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const Banner = require("./banner.model");

// Create Banner
exports.CreateBanner = catchAsyncErrors(async (req, res, next) => {
    res.status(201).json({ success: true, image: "image" });
});

// Get Banner
exports.GetAllBanners = catchAsyncErrors(async (req, res, next) => {
    const banners = await Banner.find();

    res.status(200).json({ success: true, banners });
});

// Delete Banner
exports.DeleteBanner = catchAsyncErrors(async (req, res, next) => {
    const bannerId = req.params.id;

    await Banner.deleteOne({ _id: bannerId });

    res.status(200).json({ success: true, message: "Banner deleted." });
});
