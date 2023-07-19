const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const Banner = require("./banner.model");
const multer = require("multer");
const { promisify } = require("util");
const { uploadFile } = require("../../utils/s3");

// Create a multer instance and configure it
const storage = multer.memoryStorage();
const uploadMiddleware = multer({ storage: storage }).array("images");
const uploadMiddlewareAsync = promisify(uploadMiddleware);

// Create Banner
exports.CreateBanner = catchAsyncErrors(async (req, res, next) => {
    await uploadMiddlewareAsync(req, res);

    const files = req.files;
    const result = await uploadFile(files);

    const updateImages = [];

    for (let i = 0; i < result.length; i++) {
        updateImages.push({
            public_id: result[i].key,
            url: result[i].Location,
        });
    }

    req.body.images = updateImages;

    const banner = await Banner.create(req.body);

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
