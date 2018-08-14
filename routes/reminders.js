const express = require('express');
const router = express.Router();

// Bring in Proprietar and User model
let Reminder = require('../models/reminder');

router.get('/', ensureAuthenticated, function(req, res) {
  Reminder.find({})
    .sort({ date: 'asc' })
    .exec(function(err, reminders) {
      if (err) {
        console.log(err);
      } else {
        res.render('reminder/reminders', {
          reminders: reminders
        });
      }
    });
});

router.post('/read/:reminder_id', ensureAuthenticated, function(req, res) {
  Reminder.findById(req.params.reminder_id, function(err, reminder) {
    if (err) {
      console.log(err);
    } else {
      // Update Animal
      let updReminder = {};
      updReminder.tratament_id = reminder._id;
      updReminder.animal_id = reminder.animal_id;
      updReminder.proprietar_id = reminder.proprietar_id;

      if (reminder.read == false) {
        updReminder.read = true;
      } else {
        updReminder.read = false;
      }

      let query = { _id: req.params.reminder_id };

      Reminder.update(query, updReminder, function(err2) {
        if (err2) {
          console.log(err2);
        } else {
          console.log('Reminder updated!');
          res.sendStatus(200);
        }
      });
    }
  });
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash('info', 'Va rugam sa va autentificati inainte de a proceda.');
    req.session.returnTo = req.path;
    res.redirect('/users/login');
  }
}

module.exports = router;
