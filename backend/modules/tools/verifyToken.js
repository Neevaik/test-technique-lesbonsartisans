const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

function verifyToken(req, res, next) {
    const token = req.headers.authorization;

    if (!token || !token.startsWith('Bearer ')) {
        return res.status(401).json({ result: false, message: 'Token not provided' });
    }

    const tokenStr = token.split(' ')[1];

    jwt.verify(tokenStr, JWT_SECRET, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ result: false, message: 'Token expired' });
            }
            return res.status(401).json({ result: false, message: 'Failed to authenticate token' });
        }

        req.username = decoded.username;
        next();
    });
}

module.exports = { verifyToken };
