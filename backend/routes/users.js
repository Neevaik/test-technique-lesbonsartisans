//#region imports
var express = require('express');
var router = express.Router();

require('../models/connection');

const User = require('../models/users');
const uid2 = require('uid2');
const bcrypt = require('bcrypt');

const { checkUser } = require('../modules/checkUser')
const { checkBody } = require('../modules/checkBody')
//#endregion

//#region POST METHOD
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  const requiredFields = ['username', 'password'];

  if (!checkBody(req.body, requiredFields)) {
    return res.status(400).json({ result: false, message: 'Missing field' });
  }

  try {
    const userExists = await checkUser(username);

    if (userExists) {
      return res.status(400).json({ result: false, message: 'User already exists' });
    }

    const newUser = new User({
      username,
      password: bcrypt.hashSync(password, 10),
      token: uid2(32)
    });

    const data = await newUser.save();
    res.json({ result: true, message: 'User added!', token: data.token });
  } catch (error) {
    res.status(500).json({ result: false, message: 'Internal server error', error: error.message });
  }
});


router.post('/signin', async (req, res) => {

  const { username, password } = req.body;
  const requiredFields = ['username', 'password'];

  if (!checkBody(req.body, requiredFields)) {
    return res.status(400).json({ result: false, message: 'Missing field' });
  }

  try {
    const user = await User.findOne({ username });

    if (user && bcrypt.compareSync(password, user.password)) {
      return res.json({ result: true, user });
    }
    return res.status(401).json({ result: false, message: 'Invalid username or password' });

  } catch (error) {
    res.status(500).json({ result: false, message: 'Error during authentication', error: error.message });
  }
});

//#endregion

//#region GET METHOD
router.get('/all',(req,res) => {
  User.find()
  .then(data => res.json({allUsers:data}))
})

//#endregion


module.exports = router;
