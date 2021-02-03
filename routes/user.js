const express = require('express');
const router = express.Router();

// Middleware imports
const { authCheck, adminCheck } = require('../middlewares/auth');

const { updateUserAddress, getUserAddress } = require('../controllers/user');

router.get('/get-user-address', authCheck, getUserAddress);
router.post('/update-user-address', authCheck, updateUserAddress);

module.exports = router;