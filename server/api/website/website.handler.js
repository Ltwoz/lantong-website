const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const Website = require("./website.model");

exports.getWebsiteConfig = catchAsyncErrors(async (req, res, next) => {
    const config = Website.findOne().select("-__v -_id");

    res.status(200).json({ success: true, config });
});

exports.updateWebsiteConfig = catchAsyncErrors(async (req, res, next) => {
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
