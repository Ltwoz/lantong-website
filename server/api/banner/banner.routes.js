const express = require("express");
const {
    CreateBanner,
    DeleteBanner,
    GetAllBanners,
} = require("./banner.handler");

const router = express.Router();

router.route("/banners").get(GetAllBanners);

router.route("/admin/banner/new").post(CreateBanner);

router.route("admin/banner/:id").delete(DeleteBanner);

module.exports = router;
