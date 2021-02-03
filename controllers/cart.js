const User = require('../models/User');

exports.updateUserCart = async (req, res) => {
    const { product, type } = req.body;

    const user = await User.findOne({ email: req.user.email }).exec();

    const existingCartItem = user.cart.find(el => el._id === product._id);
    
    let message = { message: 'ok' };

    if (existingCartItem === undefined) {
        const addItem = await User.findOneAndUpdate(
            { email: req.user.email },
            {
                $push: { cart : { ...product, qty: 1 } }
            },
            { new: true }
        ).exec()
    } else if (existingCartItem !== undefined) {
        if (type === 'plus') {
            if (existingCartItem.qty !== existingCartItem.quantity) {
                const updateCartItem = await User.updateOne(
                    { cart: { $elemMatch: existingCartItem } }, 
                    { $set: { 'cart.$.qty': existingCartItem.qty + 1 } },
                    { new: true }
                ).exec();
            } else {
                message = { message: 'Not enough stock' };
            }
        } else if (type === 'minus') {
            if (existingCartItem.qty === 1) {
                const updateCartItem = await User.findOneAndUpdate(
                    { email: req.user.email },
                    { $pull: { cart: {  _id: existingCartItem._id } } }, 
                    { new: true }
                ).exec();
            }
            const updateCartItem = await User.updateOne(
                { cart: { $elemMatch: existingCartItem } }, 
                { $set: { 'cart.$.qty': existingCartItem.qty - 1 } },
                { new: true }
            ).exec();
        }
 
    }

    res.json(message);
}

exports.getCartItems = async (req, res) => {

    const user = await User.findOne({ email: req.user.email }).exec();

    if (user) {
        res.json(user.cart);
    } else {
        res.status(400).json({ message: 'User not found'})
    }
    
}