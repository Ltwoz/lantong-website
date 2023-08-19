const express = require("express");
const {
    createBlog,
    getFilterBlogs,
    getAdminBlogs,
    getDetailBlog,
    createBlogReview,
    getBlogReviews,
    deleteReview,
    deleteBlog,
} = require("./blog.handler");
const {
    isAuthenticatedUser,
    authorizeRoles,
} = require("../../middleware/auth");

const router = express.Router();

router.route("/blogs").get(getFilterBlogs);

router
    .route("/admin/blogs")
    .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminBlogs);

router.route("/blog/:id").get(getDetailBlog);

router.route("/blog/review/new").put(isAuthenticatedUser, createBlogReview);

router
    .route("/blog/reviews")
    .get(getBlogReviews)
    .delete(isAuthenticatedUser, deleteReview);

router
    .route("/admin/blog/new")
    .post(isAuthenticatedUser, authorizeRoles("admin"), createBlog);

router
    .route("/admin/blog/:id")
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteBlog);

// TODO: Update blog routes

module.exports = router;
