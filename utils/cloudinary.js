const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const cloudinaryUpload = (path, folder) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(path, { folder: folder }, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });
};

const cloudinaryDestroy = (userId) => {
  cloudinary.uploader.destroy(id, (error, result) => {
    error && res.status(500).json(error);
  });
};

module.exports = { cloudinaryUpload, cloudinaryDestroy };
