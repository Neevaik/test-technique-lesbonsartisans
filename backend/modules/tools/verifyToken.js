const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ result: false, message: 'Token not provided' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error('Failed to authenticate token:', err.message);
      return res.status(401).json({ result: false, message: 'Failed to authenticate token' });
    }

    console.log('Token verified. Decoded:', decoded);
    req.username = decoded.username;

    next();
  });
}

module.exports = { verifyToken };
