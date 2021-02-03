const Order = require('../models/Order');
const User = require('../models/User');

exports.addOrder = async (req, res) => {

    const { items } = req.body;

    const user = await User.findOne({ email: req.user.email }).exec();


    try {
        const newOrder = await new Order({ 
            user: user._id, 
            items, 
            amount: items.reduce((a, b) => {
                return a + (b.qty * b.price)
            }, 0) 
        }).save();

        const resetCart = await User.findOneAndUpdate(
            { email: req.user.email },
            {
                $set: { cart : [] }
            },
            { new: true }
        ).exec()
    
        res.json(newOrder);

    } catch(err) {
        res.status(400).json({ message: err})
    }

}

exports.getAdminOrders = async (req, res) => {

    try {
        const orders = await Order.find().populate('user').exec();

        res.json(orders);
    } catch (err) {
        res.status(400).json({ message: err })
    }
};

exports.getUserOrders = async (req, res) => {

    const user = await User.findOne({ email: req.user.email }).exec();

    try {
        const orders = await Order
            .find({ user: user._id })
            .populate('user', 'name role email')
            .exec();

        res.json(orders);
    } catch (err) {
        res.status(400).json({ message: err })
    }
};

exports.getOrder = async (req, res) => {

    const { id } = req.params


    try {
        const order = await Order
            .findById(id)
            .populate('user', 'name role email address')
            .exec();


        res.json(order);
    } catch (err) {
        res.status(400).json({ message: err })
    }

}