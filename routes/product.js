const express = require('express');
const router = express.Router();

// Middleware imports
const { authCheck, adminCheck } = require('../middlewares/auth');

// Controller imports
const { 
    create, 
    list, 
    listAll, 
    read, 
    remove, 
    update, 
    productsCount, 
    getRelated, 
    productRating,
    getProductRating,
    searchProducts,
    getPriceRange,
} = require('../controllers/product');

// Routes
router.post('/product', authCheck, adminCheck, create);
router.get('/products', listAll);
router.get('/product/:id', read);
router.delete('/product/:id', authCheck, adminCheck, remove);
router.put('/product/:id', authCheck, adminCheck, update)

router.post('/products', list);
router.get('/products/total', productsCount);
router.get('/products/related/:sub', getRelated);

router.put('/product/star/:id', authCheck, productRating)
router.post('/product/star/:id', authCheck, getProductRating)
router.get('/products/pricerange', getPriceRange);
router.post('/products/search', searchProducts)

module.exports = router;