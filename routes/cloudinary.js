const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const fileUploader = require('../helpers/cloudinary.config');

router.post('/', fileUploader.single('image'), (req, res, next) => {
  if (!req.file) {
    next(new Error('No file uploaded!'));
    return;
  }
  res.status(200).json({
    status: 200,
    message: 'Upload to cloud success!',
    img_url: req.file.path,
  });
});

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

router.delete('/delete', (req, res, next) => {
  const { imgID } = req.query;
  cloudinary.uploader.destroy(imgID, function(result) {
    res.status(200).json({
      status: 200,
      message: 'Image deleted successfully',
      data: result,
    });
  });
});

module.exports = router;
