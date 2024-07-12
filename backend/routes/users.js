//#region imports
var express = require('express');
var router = express.Router();

require('../models/connection');

const User = require('../models/users');
const uid2 = require('uid2');
const bcrypt = require('bcrypt');

const { validateSignup } = require('../modules/checkUser')
const { checkBody } = require('../modules/tools/bodyExamination')
//#endregion

//#region POST METHOD
router.post('/signup', async (req, res) => {

  const validUser = await validateSignup(req.body);
  if (!validUser.isValid) {
    return res.status(400).json({ result: false, message: validUser.message });
  }
  
  const { username } = validUser;
  try {

    const newUser = new User({
      username,
      password: bcrypt.hashSync(req.body.password, 10),
      token: uid2(32)
    });

    const data = await newUser.save();
    return res.json({ result: true, message: 'User added!', user: data });

  } catch (error) {
    return res.status(500).json({ result: false, message: 'Internal server error', error: error.message });
  }
});


router.post('/signin', async (req, res) => {

  const { username, password } = req.body;

  if (!checkBody(req.body, ['username', 'password'])) {
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
router.get('/all', (req, res) => {
  User.find()
    .then(data => res.json({ allUsers: data }))
})

//#endregion


module.exports = router;
