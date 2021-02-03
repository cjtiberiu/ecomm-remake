const express = require('express');
const router = express.Router();

// Middleware imports
const { authCheck, adminCheck } = require('../middlewares/auth');

// Controller imports
const { create, read, update, remove, list } = require('../controllers/sub');

// Routes
router.post('/sub', authCheck, adminCheck, create);
router.get('/subs', list);
router.get('/sub/:slug', read)
router.delete('/sub/:slug', authCheck, adminCheck, remove);
router.put('/sub/:slug', authCheck, adminCheck, update)


module.exports = router;