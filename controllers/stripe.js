const User = require('../models/User');
const Product = require('../models/Product');
const stripe = require('stripe')(process.env.STRIPE_SECRET);

exports.createPaymentIntent = async (req, res) => {
    
    const paymentIntent = await stripe.paymentIntents.create({
        amount: 100,
        currency: 'USD',
        
    })
}