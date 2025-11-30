const jwt = require('jsonwebtoken');

// Middleware to verify JWT
module.exports = function (req, res, next) {
    const authHeader = req.headers['authorization'];

    // Token না থাকলে error
    if (!authHeader) {
        return res.status(401).json({ message: 'No token provided' });
    }

    // Format: "Bearer token"
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Invalid token format' });
    }

    // Verify Token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Failed to authenticate token' });
        }

        // Token valid — user তথ্য req.user এ যুক্ত
        req.user = decoded;

        next(); 
    });
};
