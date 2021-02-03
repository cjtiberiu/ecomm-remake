const express = require('express');
const router = express.Router();

// middlewares imports
const { authCheck, adminCheck } = require('../middlewares/auth');

// controllers imports
const { addToWishlist, removeFromWishlist, getWishlist } = require('../controllers/wishlist');

// routes
router.post('/add-to-wishlist', authCheck, addToWishlist);
router.post('/remove-from-wishlist', authCheck, removeFromWishlist);
router.get('/getwishlist', authCheck, getWishlist);

module.exports = router;