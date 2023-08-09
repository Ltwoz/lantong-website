const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const Website = require("./website.model");

exports.getWebsiteConfig = catchAsyncErrors(async (req, res, next) => {
    const config = Website.find();

    res.status(200).json({ success: true, config });
})