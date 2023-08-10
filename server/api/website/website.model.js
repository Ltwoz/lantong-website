const mongoose = require("mongoose");

const websiteSchema = mongoose.Schema({
    website_title: {
        type: String,
        default: "หจก.ลานทองเชียงใหม่",
    },
    website_name: {
        type: String,
        default: "หจก.ลานทองเชียงใหม่",
    },
    website_desc: {
        type: String,
        default: "หจก.ลานทองเชียงใหม่ ขายรถพ่วงและมอเตอร์ไซค์",
    },
    style: {
        primary_color: {
            type: String,
            default: "#5c6ac4",
        },
    },
    about_bg: [
        {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
        },
    ],
    about_detail: {
        type: String,
    },
    social: {
        facebook_url: {
            type: String,
            default: "https://www.facebook.com/lantongshop",
        },
        line_url: {
            type: String,
            default: "https://www.facebook.com/lantongshop",
        },
    },
});

module.exports = mongoose.model("Website", websiteSchema);
