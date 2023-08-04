const express = require("express");
const {
    getFilterProducts,
    createProduct,
    getAdminProducts,
    getDetailProduct,
    updateProduct,
    deleteProduct,
    getAdminDetailProduct,
} = require("./product.handlers");
const {
    isAuthenticatedUser,
    authorizeRoles,
} = require("../../middleware/auth");

const router = express.Router();

router.route("/products").get(getFilterProducts);

router.route("/product/:id").get(getDetailProduct);

router
    .route("/admin/product/new")
    .post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);

router
    .route("/admin/products")
    .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);

router
    .route("/admin/product/:id")
    .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminDetailProduct)
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

module.exports = router;
