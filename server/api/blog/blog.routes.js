const express = require("express");
const { createBlog } = require("./blog.handler");
const {
    isAuthenticatedUser,
    authorizeRoles,
} = require("../../middleware/auth");

const router = express.Router();

router
    .route("/admin/blog/new")
    .post(isAuthenticatedUser, authorizeRoles("admin"), createBlog);

module.exports = router;
