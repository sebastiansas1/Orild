const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// Bring in User model
let User = require('../models/user');

// Register Form
router.get('/register', function (req, res) {
  res.render('user/register');
});

// Register Process POST
router.post('/register', function (req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const password2 = req.body.password2;

  req.checkBody('name', 'Name is required!').notEmpty();
  req.checkBody('email', 'Email is required!').notEmpty();
  req.checkBody('email', 'Email is not valid!').isEmail();
  req.checkBody('username', 'Username is required!').notEmpty();
  req.checkBody('password', 'Password is required!').notEmpty();
  req.checkBody('password2', 'Passwords do not mathc!').equals(req.body.password);

  let errors = req.validationErrors();

  if (errors) {
    res.render('user/register', {
      errors: errors
    });
  } else {
    let newUser = new User({
      name: name,
      email: email,
      username: username,
      password: password
    });

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(newUser.password, salt, function (err, hash) {
        if (err) {
          console.log(err);
        }
        newUser.password = hash;
        newUser.save(function(err) {
          if(err) {
            console.log(err);
            return;
          } else {
            req.flash('success', 'You are now registered. You may now log in');
            res.redirect('/users/login');
          }
        });
      });
    });
  }
});

// Login Form
router.get('/login', function(req, res) {
  res.render('user/login');
});

// Login Process POST
router.post('/login', function(req, res, next) {

  if (req.session.returnTo == undefined) {
    var path = "/";
  } else {
    var path = req.session.returnTo;
  }

  passport.authenticate('local', {
    successRedirect: path,
    failureRedirect: '/users/login', 
    failureFlash: true
  })(req, res, next);
});

// router.get('/logout', function(req, res) {
//   req.logout();
//   req.flash('success', 'You are logged out');
//   res.redirect('/users/login');
// });

router.get('/logout', function (req, res) {
  req.logout();
  delete req.session.returnTo;
  req.flash('success', "See you soon!");
  // Clear user.id from cookies
  res.clearCookie('userid');
  res.clearCookie('username');
  res.redirect('/users/login');
});

module.exports = router;