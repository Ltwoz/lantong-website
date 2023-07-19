const AWS = require("aws-sdk")
const { nanoid } = require("nanoid");

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

exports.uploadFile = async (files) => {
    const uploadPromises = files.map(async (file) => {
        const s3 = new AWS.S3({
            accessKeyId: accessKeyId,
            secretAccessKey: secretAccessKey,
            region: region,
            signatureVersion: "v4",
        });

        const params = {
            Bucket: bucketName,
            Body: file.buffer,
            Key: nanoid(20),
        };

        const uploadResult = await s3.upload(params).promise();
        return uploadResult;
    });

    return Promise.all(uploadPromises);
};

exports.deleteFiles = async (files) => {
    console.log("files to delete s3 :", files);

    const deletePromises = files.map(async (file) => {
        const s3 = new AWS.S3({
            accessKeyId: accessKeyId,
            secretAccessKey: secretAccessKey,
            region: region,
            signatureVersion: "v4",
        });

        const params = {
            Bucket: bucketName,
            Key: file.public_id,
        };

        const deleteResult = await s3.deleteObject(params).promise();
        return deleteResult;
    });

    return Promise.all(deletePromises);
};
