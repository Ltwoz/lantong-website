const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const Website = require("./website.model");
const multer = require("multer");
const { promisify } = require("util");
const { uploadFile, deleteFiles } = require("../../utils/s3");

exports.getWebsiteConfig = catchAsyncErrors(async (req, res, next) => {
    const config = await Website.findOne().select("-__v -_id");

    res.status(200).json({ success: true, config });
});

exports.updateWebsiteConfig = catchAsyncErrors(async (req, res, next) => {
    // Create a multer instance and configure it
    const storage = multer.memoryStorage();
    const uploadMiddleware = multer({ storage: storage }).array("about_bg");
    const uploadMiddlewareAsync = promisify(uploadMiddleware);

    await uploadMiddlewareAsync(req, res);

    // TODO : Remove old image before upload new image.

    const files = req.files;
    const result = await uploadFile(files, "about_bg");

    req.body.about_bg = [
        {
            public_id: result[0].key,
            url: result[0].Location,
        },
    ];
    req.body.style = JSON.parse(req.body.style);
    req.body.social = JSON.parse(req.body.social);

    const config = await Website.findOneAndUpdate(
        {},
        { $set: req.body },
        { upsert: true }
    );

    res.status(201).json({
        success: true,
        config,
    });
});
