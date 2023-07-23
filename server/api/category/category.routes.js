const express = require("express");
const {
    createCategory,
    getAllCategories,
    getDetailCategory,
    getAdminCategories,
} = require("./category.handlers");

const router = express.Router();

router.route("/categories").get(getAllCategories);

router.route("/category/:id").get(getDetailCategory);

router.route("/admin/categories").get(getAdminCategories);

router.route("/admin/category/new").post(createCategory);

//todo put, delete, get by id

module.exports = router;
