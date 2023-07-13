const express = require("express");
const {
    getFilterProducts,
    createProduct,
    getAdminProducts,
    getDetailProduct,
    updateProduct,
    deleteProduct,
} = require("./product.handlers");

const router = express.Router();

router.route("/products").get(getFilterProducts);

router.route("/product/:id").get(getDetailProduct);

router.route("/admin/product/new").post(createProduct);

router.route("/admin/products").get(getAdminProducts);

//todo get admin product by id

router.route("/admin/product/:id").put(updateProduct).delete(deleteProduct);

module.exports = router;
