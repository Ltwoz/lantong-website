const productRoutes = require("./api/product/product.routes");
const categoryRoutes = require("./api/category/category.routes");
const bannerRoutes = require("./api/banner/banner.routes");

module.exports = function (app) {
    app.use("/api", productRoutes);
    app.use("/api", categoryRoutes);
    app.use("/api", bannerRoutes);
};
