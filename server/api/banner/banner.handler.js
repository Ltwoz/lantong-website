const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const Banner = require("./banner.model");
const multer = require("multer");
const { promisify } = require("util");
const { uploadFile, deleteFiles } = require("../../utils/s3");

// Create a multer instance and configure it
const storage = multer.memoryStorage();
const uploadMiddleware = multer({ storage: storage }).array("banner");
const uploadMiddlewareAsync = promisify(uploadMiddleware);

// Create Banner
exports.CreateBanner = catchAsyncErrors(async (req, res, next) => {
    await uploadMiddlewareAsync(req, res);

    const files = req.files;
    const result = await uploadFile(files, "banners");

    req.body.public_id = result[0].key;
    req.body.url = result[0].Location;

    const banner = await Banner.create(req.body);

    res.status(201).json({ success: true, banner });
});

// Get All Banners
exports.GetAllBanners = catchAsyncErrors(async (req, res, next) => {
    const banners = await Banner.find();

    res.status(200).json({ success: true, banners });
});

// Get Admin Banners
exports.GetAdminBanners = catchAsyncErrors(async (req, res, next) => {
    const banners = await Banner.find();

    res.status(200).json({ success: true, banners });
});

// Delete Banner
exports.DeleteBanner = catchAsyncErrors(async (req, res, next) => {
    const banner = await Banner.find({ _id: req.params.id });

    //Deleting Images From AWS S3
    await deleteFiles(banner);

    await Banner.deleteOne({ _id: req.params.id });

    res.status(200).json({ success: true, message: "Banner deleted." });
});
