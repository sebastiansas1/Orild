const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Bring in User model
const User = require('../models/user');

// Bring in Database config
const database = require('../config/database'); 

module.exports = function(passport) {
  // Local Strategy 
  passport.use(new LocalStrategy(function(username, password, done) {
    // match Username 
    let query = { username: username };

    User.findOne(query, function(err, user) {
      if(err) throw err;
      if(!user) {
        return done(null, false, { message: 'Acest user nu exista.' });
      }

      // Match Password
      bcrypt.compare(password, user.password, function(err, isMatch) {
        if(err) throw err;
        if(isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Password gresit.' });
        }
      });
    });
  }));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
}