const User = require('../models/User');

const createUpdateUser = async (req, res) => {
    const { name, picture, email } = req.user;

    // Find user by email (first argument), update user name and picture (second argument), use new to send new information to client
    const user = await User.findOneAndUpdate({email}, {name : email.split('@')[0], picture}, {new: true});

    if (user) {
        // If the user exist send the user as a response
        console.log('user', user);
        res.json(user);

    } else {
        // Create new user if the user doesn't exist yet and send it as a response
        const newUser = await new User({
            email,
            name: email.split('@')[0],
            picture,
        }).save();
        console.log('newUser', newUser);
        res.json(newUser);
    }
};

const getUser = async (req, res) => {
    
    const { email } = req.user;

    User.findOne({email}).exec((err, user) => {
        if (err) throw new Error(err);
        res.json(user)
    })
}

const getAdminUser = async (req, res) => {
    const { email } = req.params;


    try {
        const user = await User
            .findOne({ email })
            .select('email name createdAt role address')
            .exec();

        res.json(user);
    } catch (err) {
        res.status(404).json({ message: err })
    }

}

module.exports = {
    createUpdateUser,
    getUser,
    getAdminUser
}