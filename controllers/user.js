const User = require('../models/User');

exports.getUserAddress = async (req, res) => {

    const { email } = req.user;

    const user = await User.findOne({email}).exec();


    if (user) {
        res.json(user.address);
    } else {
        res.status(400).json({ message: 'User not found' })
    }

}

exports.updateUserAddress = async (req, res) => {

    const { email } = req.user;

    const user = await User.findOneAndUpdate({email}, {address: req.body.address}, {new: true});

    if (user) {
        res.json('Succes');
    }

};

