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

    let config = await Website.findOne();

    const files = req.files;
    const oldImages = config.about_bg || [];
    const currentImages = [];
    const updateImages = [];

    // JSON Parse images if it's not undefined
    if (req.body.about_bg !== undefined) {
        for (let i = 0; i < req.body.about_bg.length; i++) {
            const image = req.body.about_bg[i];
            currentImages.push(JSON.parse(image));
        }
    }

    // Check unmatched
    const unmatchedImages = oldImages.filter(
        (img) =>
            !currentImages.some(
                (image) => image.public_id === img.public_id
            )
    );

    console.log(unmatchedImages);

    //Deleting Images From AWS S3
    await deleteFiles(unmatchedImages);

    const result = await uploadFile(files, "about_bg");

    if (currentImages.length === 0) {
        for (let i = 0; i < result.length; i++) {
            updateImages.push({
                public_id: result[i].key,
                url: result[i].Location,
            });
        }
    } else {
        // Push current images
        for (let i = 0; i < currentImages.length; i++) {
            updateImages.push({
                public_id: currentImages[i].public_id,
                url: currentImages[i].url,
            });
        }
    }

    req.body.about_bg = updateImages;
    req.body.style = JSON.parse(req.body.style);
    req.body.social = JSON.parse(req.body.social);

    config = await Website.findOneAndUpdate(
        {},
        { $set: req.body },
        { upsert: true }
    );

    res.status(201).json({
        success: true,
        config,
    });
});
