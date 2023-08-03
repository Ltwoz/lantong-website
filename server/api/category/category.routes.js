const express = require("express");
const {
    createCategory,
    getAllCategories,
    getDetailCategory,
    getAdminCategories,
    getAdminDetailCategory,
    updateCategory,
    deleteCategory,
} = require("./category.handlers");
const {
    isAuthenticatedUser,
    authorizeRoles,
} = require("../../middleware/auth");

const router = express.Router();

router.route("/categories").get(getAllCategories);

router.route("/category/:id").get(getDetailCategory);

router
    .route("/admin/categories")
    .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminCategories);

router
    .route("/admin/category/new")
    .post(isAuthenticatedUser, authorizeRoles("admin"), createCategory);

router
    .route("/admin/category/:id")
    .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminDetailCategory)
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateCategory)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteCategory);

module.exports = router;
