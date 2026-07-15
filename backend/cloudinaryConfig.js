const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// 1. Cloudinary ko credentials ke sath configure kiya
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// 2. Storage engine banaya jo batayega ki file Cloudinary par kis folder me save hogi
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'easygo-cars', // Cloudinary ke dashboard me is naam ka folder automatic ban jayega
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'], // Sirf ye formats allowed honge
  },
});

// 3. Multer ko Cloudinary storage ke sath initialize kiya
const uploadCloud = multer({ storage: storage });

module.exports = uploadCloud;