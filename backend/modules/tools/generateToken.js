const jwt = require('jsonwebtoken');

function generateToken(payload) {

  const token = jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: '5m' }
  );

  return token;
}


module.exports = { generateToken };
