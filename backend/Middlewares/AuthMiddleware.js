const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/AuthModel');

const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Access Denied' });
    }

    jwt.verify(token, process.env.TOKEN_KEY, async (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid Token' });
        }
        try {
            const user = await User.findById(decoded.id).select('-password');
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            req.user = user;
            next();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });
};

module.exports = authenticateToken;
