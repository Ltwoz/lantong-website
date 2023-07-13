const productRoutes = require("./api/product/product.routes");
const categoryRoutes = require("./api/category/category.routes");

module.exports = function (app) {
    app.use("/api", productRoutes);
    app.use("/api", categoryRoutes);
};
