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
    website_icon: {
        type: String,
        default: "https://media.discordapp.net/attachments/717327142978977834/1060896307235004467/favicon.png",
    },
    website_logo: {
        type: String,
        default: "",
    },
    website_image: {
        type: String,
        default: "",
    },
    style: {
        primary_color: {
            type: String,
            default: "#5c6ac4",
        },
    },
    social: {
        facebook_url: {
            type: String,
            default: "https://www.facebook.com/lantongshop",
        },
    },
});

module.exports = mongoose.model("Website", websiteSchema);
