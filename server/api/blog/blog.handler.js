const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const Blog = require("./blog.model");
const multer = require("multer");
const { promisify } = require("util");
const { uploadFile, deleteFiles } = require("../../utils/s3");
const ApiFeatures = require("../../utils/apiFeatures");

// Create Blog -- Admin
exports.createBlog = catchAsyncErrors(async (req, res, next) => {
    // Create a multer instance and configure it
    const storage = multer.memoryStorage();
    const uploadMiddleware = multer({ storage: storage }).array("images");
    const uploadMiddlewareAsync = promisify(uploadMiddleware);

    await uploadMiddlewareAsync(req, res);

    const files = req.files;

    const result = await uploadFile(files, "blogs");

    const updateImages = [];

    for (let i = 0; i < result.length; i++) {
        updateImages.push({
            public_id: result[i].key,
            url: result[i].Location,
        });
    }

    req.body.images = updateImages;

    const blog = await Blog.create(req.body);

    res.status(201).json({ success: true, blog });
});

// Get Filter Blogs
exports.getFilterBlogs = catchAsyncErrors(async (req, res, next) => {
    const resultPerPage = 20;
    const blogsCount = await Blog.countDocuments();

    const apiFeature = new ApiFeatures(Blog.find(), req.query)
        .search(["name"])
        .filter()
        .sort();

    let blogs = await apiFeature.query;

    let filteredBlogsCount = blogs.length;

    apiFeature.pagination(resultPerPage);

    blogs = await apiFeature.query.clone();

    const totalPageCount = Math.ceil(filteredBlogsCount / resultPerPage);

    res.status(200).json({
        success: true,
        blogs,
        filteredBlogsCount,
        totalPageCount,
        blogsCount,
    });
});

// Get Detail Blog
exports.getDetailBlog = catchAsyncErrors(async (req, res, next) => {
    const blogId = req.params.id;

    const blog = await Blog.findOne({ _id: blogId });

    if (!blog) {
        return res.status(404).json({ error: "No Blog found." });
    }

    res.status(200).json({ success: true, blog });
});

// Get Blogs Category
exports.getBlogsCategory = catchAsyncErrors(async (req, res, next) => {
    const blogs = await Blog.find();

    const categories = []; // Initialize an empty array to store unique categories

    blogs.forEach((blog) => {
        if (!categories.includes(blog.category)) {
            categories.push(blog.category); // Push category to array if it's not already there
        }
    });

    res.status(200).json({ succes: true, categories });
});

// Get All Blogs -- Admin
exports.getAdminBlogs = catchAsyncErrors(async (req, res, next) => {
    const resultPerPage = 20;
    const blogsCount = await Blog.countDocuments();

    const apiFeature = new ApiFeatures(Blog.find(), req.query)
        .search(["name"])
        .filter()
        .sort();

    let blogs = await apiFeature.query;

    let filteredBlogsCount = blogs.length;

    apiFeature.pagination(resultPerPage);

    blogs = await apiFeature.query.clone();

    const totalPageCount = Math.ceil(filteredBlogsCount / resultPerPage);

    res.status(200).json({
        success: true,
        blogs,
        filteredBlogsCount,
        totalPageCount,
        blogsCount,
    });
});

// Update Blog -- Admin
exports.updateBlog = catchAsyncErrors(async (req, res, next) => {
    // Create a multer instance and configure it
    const storage = multer.memoryStorage();
    const uploadMiddleware = multer({ storage: storage }).array("files");
    const uploadMiddlewareAsync = promisify(uploadMiddleware);

    await uploadMiddlewareAsync(req, res);

    let blog = await Blog.findById(req.params.id);

    const files = req.files;

    // Images Array
    const oldImages = blog.images || [];
    const currentImages = [];
    const updateImages = [];

    console.log(files);

    // JSON Parse images if it's not undefined
    if (req.body.images !== undefined) {
        for (let i = 0; i < req.body.images.length; i++) {
            const image = req.body.images[i];
            currentImages.push(JSON.parse(image));
        }
    }

    // Check unmatched
    const unmatchedImages = oldImages.filter(
        (img) =>
            !currentImages.some((image) => image.public_id === img.public_id)
    );

    //Deleting Images From AWS S3
    await deleteFiles(unmatchedImages);

    // Upload Images
    const result = await uploadFile(files, "blogs");

    if (currentImages.length === 0) {
        for (let i = 0; i < result.length; i++) {
            updateImages.push({
                public_id: result[i].key,
                url: result[i].Location,
            });
        }
    } else {
        // Push current images and push new images (if have)
        for (let i = 0; i < currentImages.length; i++) {
            updateImages.push({
                public_id: currentImages[i].public_id,
                url: currentImages[i].url,
            });
        }
        for (let i = 0; i < result.length; i++) {
            updateImages.push({
                public_id: result[i].key,
                url: result[i].Location,
            });
        }
    }

    req.body.images = updateImages;

    blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({ success: true, blog });
});

// Delete Blog -- Admin
exports.deleteBlog = catchAsyncErrors(async (req, res, next) => {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
        res.status(404).json({
            success: false,
            message: "Blog not found.",
        });
    }

    //Deleting Images From AWS S3
    await deleteFiles(blog.images);

    await blog.remove();

    res.status(200).json({ success: true, message: "Blog deleted." });
});

// Create New Review or Update the review
exports.createBlogReview = catchAsyncErrors(async (req, res, next) => {
    const { rating, comment, blogId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    };

    const blog = await Blog.findById(blogId);

    const isReviewed = blog.reviews?.find(
        (rev) => rev.user.toString() === req.user._id.toString()
    );

    if (isReviewed) {
        blog.reviews?.forEach((rev) => {
            if (rev.user.toString() === req.user._id.toString())
                (rev.rating = rating), (rev.comment = comment);
        });
    } else {
        blog.reviews?.push(review);
        blog.numOfReviews = blog.reviews?.length;
    }

    let avg = 0;

    blog.reviews?.forEach((rev) => {
        avg += rev.rating;
    });

    blog.ratings = avg / blog.reviews?.length;

    await blog.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
    });
});

// Get All Reviews of a blog
exports.getBlogReviews = catchAsyncErrors(async (req, res, next) => {
    const blog = await Blog.findById(req.query.id);

    if (!blog) {
        return next(new ErrorHander("Blog not found", 404));
    }

    res.status(200).json({
        success: true,
        reviews: blog.reviews,
    });
});

// Delete Review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
    const blog = await Blog.findById(req.query.blogId);

    if (!blog) {
        return next(new ErrorHander("Blog not found", 404));
    }

    const reviews = blog.reviews.filter(
        (rev) => rev._id.toString() !== req.query.id.toString()
    );

    let avg = 0;

    reviews.forEach((rev) => {
        avg += rev.rating;
    });

    let ratings = 0;

    if (reviews.length === 0) {
        ratings = 0;
    } else {
        ratings = avg / reviews.length;
    }

    const numOfReviews = reviews.length;

    await Blog.findByIdAndUpdate(
        req.query.blogId,
        {
            reviews,
            ratings,
            numOfReviews,
        },
        {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        }
    );

    res.status(200).json({
        success: true,
    });
});
