const express = require('express');
const router = express.Router({ mergeParams: true });

// Bring in Tratament model
const Tratament = require('../models/tratament');
const Animal = require('../models/animal');
const Reminder = require('../models/reminder');

let moment = require('moment');

// Add Route
router.get('/add', ensureAuthenticated, function(req, res) {
  Animal.findById(req.params.animal_id, function(err, animal) {
    if (err) {
      console.log(err);
    } else {
      res.render('tratament/add_tratament', {
        animal: animal
      });
    }
  });
});

// Add Tratament [POST]
router.post('/add', function(req, res) {
  // Check Fields
  req.checkBody('name', 'Numele produsului este obligatoriu').notEmpty();
  req.checkBody('dose', 'Dosa administrata este obligatorie').notEmpty();

  // Get Errors
  let errors = req.validationErrors();

  if (errors) {
    res.render('tratament/add_tratament', {
      errors: errors
    });
  } else {
    let tratament = new Tratament();
    let reminder = new Reminder();

    tratament.name = req.body.name;
    tratament.series = req.body.series;
    tratament.dose = req.body.dose;
    tratament.expiry_date = moment(req.body.expiry_date, 'DD-MM-YYYY').toDate();
    tratament.waiting_time = req.body.waiting_time;
    tratament.duration = req.body.duration;
    tratament.result = req.body.result;
    tratament.signature = req.body.signature;
    tratament.observations = req.body.observations;
    tratament.administration_date = moment(
      req.body.administration_date,
      'DD-MM-YYYY'
    ).toDate();
    tratament.animal_id = req.params.animal_id;

    tratament.save(function(err, object) {
      if (err) {
        console.log(err);
      } else {
        Animal.findById(req.params.animal_id, function(err2, animal) {
          if (err2) {
            console.log(err2);
          } else {
            reminder.animal_id = animal._id;
            reminder.animal_name = animal.registration_nr;
            reminder.proprietar_id = animal.proprietar_id;
            reminder.tratament_id = object._id;
            reminder.tratament_name = object.name;
            reminder.date = moment(req.body.administration_date, 'DD-MM-YYYY')
              .add(1, 'y')
              .toDate();

            reminder.save(function(err3) {
              if (err3) {
                console.log(err3);
              } else {
                req.flash('success', 'Tratament adaugat!');
                res.redirect(
                  '/proprietari/' +
                    animal.proprietar_id +
                    '/animals/' +
                    animal._id
                );
              }
            });
          }
        });
      }
    });
  }
});

// Edit Route
router.get('/edit/:tratament_id', ensureAuthenticated, function(req, res) {
  Tratament.findById(req.params.tratament_id, function(err, tratament) {
    if (err) {
      console.log(err);
    } else {
      Animal.findById(req.params.animal_id, function(err2, animal) {
        if (err2) {
          console.log(err2);
        } else {
          res.render('tratament/edit_tratament', {
            tratament: tratament,
            animal: animal
          });
        }
      });
    }
  });
});

// Edit Tratament [POST]
router.post('/edit/:tratament_id', function(req, res) {
  // Check Fields
  req.checkBody('name', 'Numele produsului este obligatoriu').notEmpty();
  req.checkBody('dose', 'Dosa administrata este obligatorie').notEmpty();

  // Get Errors
  let errors = req.validationErrors();

  if (errors) {
    res.render('tratament/add_tratament', {
      errors: errors
    });
  } else {
    let tratament = {};
    tratament.name = req.body.name;
    tratament.series = req.body.series;
    tratament.dose = req.body.dose;
    tratament.expiry_date = moment(req.body.expiry_date, 'DD-MM-YYYY').toDate();
    tratament.waiting_time = req.body.waiting_time;
    tratament.duration = req.body.duration;
    tratament.result = req.body.result;
    tratament.signature = req.body.signature;
    tratament.observations = req.body.observations;
    tratament.administration_date = moment(
      req.body.administration_date,
      'DD-MM-YYYY'
    ).toDate();
    tratament.animal_id = req.params.animal_id;

    let query = { _id: req.params.tratament_id };

    Tratament.update(query, tratament, function(err) {
      if (err) {
        console.log(err);
        return;
      } else {
        Animal.findById(req.params.animal_id, function(err2, animal) {
          if (err2) {
            console.log(err2);
          } else {
            req.flash('success', 'Tratament actualizat!');
            res.redirect(
              '/proprietari/' + animal.proprietar_id + '/animals/' + animal._id
            );
          }
        });
      }
    });
  }
});

// Get Single Tratament
router.get('/:tratament_id', ensureAuthenticated, function(req, res) {
  Tratament.findById(req.params.tratament_id, function(err, tratament) {
    if (err) {
      console.log(err);
    } else {
      Animal.findById(req.params.animal_id, function(err2, animal) {
        if (err2) {
          console.log(err2);
        } else {
          res.render('tratament/tratament', {
            tratament: tratament,
            animal: animal
          });
        }
      });
    }
  });
});

// Access Control
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
