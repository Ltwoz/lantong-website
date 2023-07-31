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

const router = express.Router();

router.route("/categories").get(getAllCategories);

router.route("/category/:id").get(getDetailCategory);

router.route("/admin/categories").get(getAdminCategories);

router.route("/admin/category/new").post(createCategory);

router.route("/admin/category/:id").get(getAdminDetailCategory).put(updateCategory).delete(deleteCategory);

module.exports = router;
