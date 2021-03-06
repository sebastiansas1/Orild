const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// Bring in User model
let User = require('../models/user');

// Register Form
router.get('/register', ensureIsAdmin, function(req, res) {
  res.render('user/register');
});

// Register Process POST
router.post('/register', ensureIsAdmin, function(req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const password2 = req.body.password2;

  req.checkBody('name', 'Numele este obligatoriu.').notEmpty();
  req.checkBody('email', 'Email-ul este obligatoriu.').notEmpty();
  req.checkBody('email', 'Email-ul este invalid.').isEmail();
  req.checkBody('username', 'Alegeti un username.').notEmpty();
  req.checkBody('password', 'Parola este obligatorie').notEmpty();
  req.checkBody('password2', 'Parola nu corespunde.').equals(req.body.password);

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

    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(newUser.password, salt, function(err, hash) {
        if (err) {
          console.log(err);
        }
        newUser.password = hash;
        newUser.save(function(err) {
          if (err) {
            console.log(err);
            return;
          } else {
            req.flash(
              'success',
              'Sunteti inregistrati. Acum puteti efectua login-ul.'
            );
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
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

router.get('/logout', function(req, res) {
  req.logout();
  req.flash('success', 'V-ati delogat cu succes.');
  res.redirect('/users/login');
});

// Access Control
function ensureIsAdmin(req, res, next) {
  if (req.user.username == 'Admin') {
    return next();
  } else {
    req.flash('info', 'Nu puteti accesa aceasta pagina.');
    res.redirect('/');
  }
}

module.exports = router;
