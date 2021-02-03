const express = require('express');
const router = express.Router();

// Middleware imports
const { authCheck, adminCheck } = require('../middlewares/auth');

// Controller imports
const { createCategory, readCategory, updateCategory, removeCategory, listCategories } = require('../controllers/category');

// Routes
router.post('/category', authCheck, adminCheck, createCategory);
router.get('/categories', listCategories);
router.get('/category/:slug', readCategory)
router.delete('/category/:slug', authCheck, adminCheck, removeCategory);
router.put('/category/:slug', authCheck, adminCheck, updateCategory)


module.exports = router;