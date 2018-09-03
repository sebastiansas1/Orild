const express = require('express');
const router = express.Router();
const moment = require('moment');

// Bring in Proprietar and User model
let Reminder = require('../models/reminder');

router.get('/', ensureAuthenticated, function(req, res) {
  Reminder.find({})
    .sort({ date: 'asc' })
    .exec(function(err, reminders) {
      if (err) {
        console.log(err);
      } else {
        var notifications = [];
        reminders.forEach(reminder => {
          if (moment(reminder.date).isBefore(moment().add(+4, 'days'))) {
            notifications.push(reminder);
          }
        });
        var notifications2 = [];
        reminders.forEach(reminder => {
          if (moment(reminder.date).isBefore(moment().add(+4, 'days'))) {
            if (reminder.read == false) {
              notifications2.push(reminder);
            }
          }
        });
        res.render('reminder/reminders', {
          reminders: notifications,
          notifications: notifications2
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
      updReminder.tratament_id = reminder.tratament_id;
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
          res.sendStatus(200);
        }
      });
    }
  });
});

// Delete Reminder Route
router.delete('/:id', ensureAuthenticated, function(req, res) {
  let query = { _id: req.params.id };
  Reminder.remove(query, function(err) {
    if (err) {
      console.log(err);
    } else {
      req.flash('danger', 'Notificarea a fost stersa.');
      res.send('Success');
    }
  });
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash('info', 'Va rugam sa va autentificati.');
    req.session.returnTo = req.path;
    res.redirect('/users/login');
  }
}

module.exports = router;
