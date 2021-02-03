const admin = require('../firebase');
const User = require('../models/User');

exports.authCheck = async (req, res, next) => { // next is required in a middleware function because node needs to know to continue from the middleware
    // Get the token from front end auth with firebase
    try {
        const firebaseUser = await admin.auth().verifyIdToken(req.headers.authtoken);
        
        //setting the user in the request for the next controller // create-update-user
        req.user = firebaseUser;

        
    } catch(err) {
        res.status(401).json({
            message: 'Invalid or expired token'
        });
    }

    next();
};

exports.adminCheck = async (req, res, next) => {
    const { email } = req.user;

    const adminUser = await User.findOne({email}).exec();

    if (adminUser.role !== 'admin') {
        res.status(403).json({
            message: 'Admin resource: Acces denied.'
        });
    } else {
        next();
    }
};