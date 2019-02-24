const express = require('express');
const { User } = require('../models/user');
const { Utils } = require('../models/utils');
const passport = require('passport');
const passportJWT = require('passport-jwt');
// const JWTStrategy = passportJWT.Strategy
// const ExtractJWT = passportJWT.ExtractJwt
const jwt = require('jsonwebtoken');
const config = require('../config');

const router = express.Router();

// router.get("/register", (req, res, next) => {
router.post('/register', (req, res, next) => {
  if (req.user) res.status(401).json({ err: 'Allready registered' });
  else next();
},
async (req, res) => {
  const login = req.body.username;
  const pass = req.body.password;
  const fullname = req.body.fullname;
  if (!valid_user_info(login) || !valid_user_info(pass)) {
    res.status(400).json({err: "Bad request"});
    return;
  }
  console.log(pass);
  const hashedPass = Utils.hash(pass);
  console.log(hashedPass);
  const user = new User(login, hashedPass, fullname, '/images/users/user_pic.png', 'None');

  console.log(user);

  try{
    await User.isValidLogin(login);
    await User.insert(user);
    res.json({user, err: null});
  } catch(err) {
      console.log(err.message);
      res.status(401).json({ err: 'Username already exists' });
  }
});

const authCallback = (req, res) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      console.log(err);
      return res.status(400).json({
        err: `${err ? err.message : "Invalid password or login"}`,
        user: user
      });
    }
    req.login(user, { session: false }, (err) => {
      if (err) { return res.send(err); }
      // generate a signed json web token with the contents of user object
      const token = jwt.sign(user.toObject(), config.secret, { expiresIn: 86400 * 30 });
      jwt.verify(token, config.secret, function (err, data) {
        console.log(err, data);
      });
      return res.json({ user, token });
    });
  })(req, res);
};

router.post('/login', authCallback);
router.post('/oauth/login', async (req, res) => {

  const user = req.body;
  console.log(user);
  

  const login = user.username;
  try {
    const foundedUser = await User.getByLogin(login);
    let loggedInUser = null;

    let isCreated = false;
    if (foundedUser && foundedUser.googleId) {
      loggedInUser = foundedUser;
    } else if (foundedUser) throw new Error('Username already taken');
    else {
      // data?
      
      const newUser = new User(login, null, user.fullname, user.ava_url, 'None', user.googleId);
      const newId = await User.insert(newUser);
      //newUser._id = newId.toString();
      loggedInUser = {login, googleId: user.googleId, ava_url: user.ava_url, fullname: user.fullname, description: "None"};
      isCreated = true;
    }
    const token = jwt.sign(isCreated ? loggedInUser : loggedInUser.toObject(), config.secret, { expiresIn: 86400 * 30 });
    jwt.verify(token, config.secret, (err, data) => {
      console.log(err, data);
    });
    res.json({ user, token });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});
function valid_user_info(str) {
  return /^(\w{3,})+$/.test(str) && str;
}

module.exports = router;
