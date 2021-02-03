const express = require('express');
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require('../middlewares/auth');

// controllers
const { addOrder, getAdminOrders, getUserOrders, getOrder } = require('../controllers/order');

router.post('/addorder', authCheck, addOrder);
router.get('/get-admin-orders', authCheck, adminCheck, getAdminOrders);
router.get('/get-user-orders', authCheck, getUserOrders);
router.get('/getorder/:id', authCheck, getOrder);

module.exports = router;