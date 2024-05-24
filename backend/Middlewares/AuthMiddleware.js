const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/AuthModel');

const authenticateToken = (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        // Get token from header
        token = req.headers.authorization.split(' ')[1]
    }
    if (!token) {
        return res.status(401).json({ message: 'Access Denied' });
    }

    // verify the token
    jwt.verify(token, process.env.TOKEN_KEY, async (error, decoded) => {
        if (error) {
            res.status(401).json({ message: 'Invalid Token' })
        }
        try {

            // Get user from the token
            const user = await User.findById(decoded.id).select('-password');

            // check if user exists
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Attach user to request object
            req.user = user;

            next();  // calling next middleware
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Not Authorized' });
        }
    })

    if (!token) {
        return res.status(401).json({ message: 'Access Denied' });
    }
};

module.exports = authenticateToken;

