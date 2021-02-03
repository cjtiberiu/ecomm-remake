const express = require('express');
const router = express.Router();

// Middleware imports
const { authCheck, adminCheck } = require('../middlewares/auth');

// Controller imports
const { createUpdateUser, getUser, getAdminUser } = require('../controllers/auth');


router.post('/create-update-user', authCheck, createUpdateUser);
router.post('/getuser', authCheck, getUser);
router.post('/getadmin', authCheck, adminCheck, getUser);
router.post('/get-user-for-admin/:email', authCheck, adminCheck, getAdminUser)


module.exports = router;