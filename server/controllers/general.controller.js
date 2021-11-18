const cloudinary = require('cloudinary').v2;
const { 
  CustomError, 
} = require('../lib/http');
cloudinary.config({
  cloud_name: process.env.cloudinary_cloud_name,
  api_key: process.env.cloudinary_api_key,
  api_secret: process.env.cloudinary_api_secret,
  secure: true,
});
exports.imageUpload = (req, res) => {
  cloudinary.uploader.upload(req.file.path, async (error, result) => {
    if(error) throw new CustomError(error,500)
    return res.status(200).send({ url: result.url });
  });
};