const User = require('../models/User');
const ObjectId = require('mongoose').Types.ObjectId;

exports.addToWishlist = async (req, res) => {

    const { product } = req.body;

    const user = await User.findOne({ email: req.user.email }).exec();

    const existingWishlistItem = user.wishlist.find(el => {
        return el == product._id
    });

    if (existingWishlistItem === undefined) {
        const addItem = await User.findOneAndUpdate(
            { email: req.user.email },
            {
                $push: { wishlist : ObjectId(product._id) }
            },
            { new: true }
        ).exec()

        const items = await User
            .findOne({ email: req.user.email })
            .select('wishlist')
            .exec();

        res.json({ message: 'ok', wishlist: items.wishlist });
    } else {
        res.json({ message: 'Item already added' });
    }
};

exports.removeFromWishlist = async (req, res) => {

    const { id } = req.body;

    try {

        const removeItem = await User.findOneAndUpdate(
            { email: req.user.email },
            { $pull: { wishlist: id  } }, 
            { new: true }
        ).exec();

        const items = await User
            .findOne({ email: req.user.email })
            .select('wishlist')
            .exec();

        if (removeItem) {
            res.json({ message: 'ok', wishlist: items.wishlist });
        } else {
            res.status(400).json({ message: 'There was a problem removing the item'})
        }


    } catch (err) {

        res.status(401).json({ message: 'Error'})
    }
};

exports.getWishlist = async (req, res) => {

    const user = await User.findOne({ email: req.user.email }).populate('wishlist').exec();

    res.json(user.wishlist);
}