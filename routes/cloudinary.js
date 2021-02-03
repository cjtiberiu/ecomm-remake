const express = require('express');
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require('../middlewares/auth');

// controllers
const { uploadImages, removeImage } = require('../controllers/cloudinary');

router.post('/uploadimages', authCheck, adminCheck, uploadImages);
router.post('/removeimage', authCheck, adminCheck, removeImage);

module.exports = router;