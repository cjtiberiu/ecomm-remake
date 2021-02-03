const express = require('express');
const router = express.Router();

// middlewares imports
const { authCheck, adminCheck } = require('../middlewares/auth');

// controllers imports
const { updateUserCart, getCartItems } = require('../controllers/cart');

// routes
router.post('/update-user-cart', authCheck, updateUserCart);
router.get('/get-cart-items', authCheck, getCartItems);

module.exports = router;