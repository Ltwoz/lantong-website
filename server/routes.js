const productRoutes = require("./api/product/product.routes");
const categoryRoutes = require("./api/category/category.routes");
const bannerRoutes = require("./api/banner/banner.routes");
const userRoutes = require("./api/user/user.routes");
const configRoutes = require("./api/website/website.routes");
const BlogRoutes = require("./api/blog/blog.routes");

module.exports = function (app) {
    app.use("/api", productRoutes);
    app.use("/api", categoryRoutes);
    app.use("/api", bannerRoutes);
    app.use("/api", userRoutes);
    app.use("/api", configRoutes);
    app.use("/api", BlogRoutes);
};
