/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: [
            "lantongshopbucket.s3.ap-southeast-1.amazonaws.com",
            "dummyimage.com",
            "media.discordapp.net",
        ],
    },
};

module.exports = nextConfig;
