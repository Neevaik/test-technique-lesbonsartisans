const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

function generateToken(payload) {

  const token = jwt.sign(
    payload,
    JWT_SECRET,
    { expiresIn: '5m' }
  );

  return token;
}


module.exports = { generateToken };
