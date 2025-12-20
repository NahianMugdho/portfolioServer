const jwt = require('jsonwebtoken');
const { tokenBlacklist } = require('../controllers/userController');  // <-- ADD THIS

// Middleware to verify JWT
module.exports = function (req, res, next) {
    const authHeader = req.headers['authorization'];

    // No token at all
    if (!authHeader) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Invalid token format' });
    }

    // ❗ Check if token is logged-out (blacklisted)
    if (tokenBlacklist.includes(token)) {
        return res.status(401).json({ message: 'Token expired or logged out' });
    }

    // Verify Token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Failed to authenticate token' });
        }

        // Token valid — attach decoded user data to req.user
        req.user = decoded;

        next();
    });
};
