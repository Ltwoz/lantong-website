const express = require("express");
const { getWebsiteConfig, updateWebsiteConfig } = require("./website.handler");
const {
    isAuthenticatedUser,
    authorizeRoles,
} = require("../../middleware/auth");

const router = express.Router();

router.route("/website-config").get(getWebsiteConfig);

router
    .route("/admin/website-config/update")
    .patch(isAuthenticatedUser, authorizeRoles("admin"), updateWebsiteConfig);

module.exports = router;
