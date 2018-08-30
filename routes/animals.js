const express = require('express');
const router = express.Router({ mergeParams: true });
const moment = require('moment');

// Bring in models
let Animal = require('../models/animal');
let Proprietar = require('../models/proprietar');
let User = require('../models/user');
const Tratament = require('../models/tratament');
let Reminder = require('../models/reminder');

// Add Route POST
router.post('/', ensureAuthenticated, function(req, res) {
  // Check Fields
  req
    .checkBody('proprietar', 'Trebe sa alegeti un proprietar din lista.')
    .notEmpty();
  req
    .checkBody('registration_nr', 'Numarul de matricol este obligatoriu.')
    .notEmpty();
  req.checkBody('species', 'Specia animalului este obligatorie.').notEmpty();
  req
    .checkBody('quantity', 'Cantitatea de animale este obligatorie.')
    .notEmpty();
  req
    .checkBody('simptomatologie', 'Simptomatologia este obligatorie.')
    .notEmpty();
  req.checkBody('diagnostic', 'Diagnosticul este obligatoriu.').notEmpty();

  // Get Errors
  let errors = req.validationErrors();

  if (errors) {
    Proprietar.find({})
      .sort({ name: 1 })
      .exec(function(err, proprietari) {
        if (err) {
          console.log(err);
        } else {
          Animal.find({})
            .sort({ registration_nr: 1 })
            .exec(function(err2, animals) {
              if (err2) {
                console.log(err2);
              } else {
                Reminder.find({ read: false })
                  .sort({ date: 1 })
                  .exec(function(err3, reminders) {
                    if (err3) {
                      console.log(err3);
                    } else {
                      var notifications = [];
                      reminders.forEach(reminder => {
                        if (
                          moment(reminder.date).isBefore(
                            moment().add(+4, 'days')
                          )
                        ) {
                          notifications.push(reminder);
                        }
                      });
                      res.render('proprietar/proprietari', {
                        proprietari: proprietari,
                        animals: animals,
                        errors: errors,
                        notifications: notifications
                      });
                    }
                  });
              }
            });
        }
      });
  } else {
    // Create Animal
    let animal = new Animal();
    animal.registration_nr = req.body.registration_nr;
    animal.species = req.body.species;
    animal.quantity = req.body.quantity;
    animal.simptomatologie = req.body.simptomatologie;
    animal.diagnostic = req.body.diagnostic;
    animal.proprietar_id = req.body.proprietar;

    animal.save(function(err) {
      if (err) {
        console.log(err);
        return;
      } else {
        Proprietar.findById(req.body.proprietar, function(err2, proprietar) {
          if (err2) {
            console.log(err2);
          } else {
            req.flash(
              'success',
              'Animal adaugat! Il puteti accessa la animalele alui ' +
                proprietar.name +
                '.'
            );
            res.redirect('/proprietari/');
          }
        });
      }
    });
  }
});

// Add Route POST
router.post('/add', ensureAuthenticated, function(req, res) {
  // Check Fields
  req
    .checkBody('registration_nr', 'Numarul de matricol este obligatoriu.')
    .notEmpty();
  req.checkBody('species', 'Specia animalului este obligatorie.').notEmpty();
  req
    .checkBody('quantity', 'Cantitatea de animale este obligatorie.')
    .notEmpty();
  req
    .checkBody('simptomatologie', 'Simptomatologia este obligatorie.')
    .notEmpty();
  req.checkBody('diagnostic', 'Diagnosticul este obligatoriu.').notEmpty();

  let proprietar_id = req.params.proprietar_id;

  // Get Errors
  let errors = req.validationErrors();

  if (errors) {
    Proprietar.findById(proprietar_id, function(err, proprietar) {
      if (err) {
        console.log(err);
      } else {
        let query = { proprietar_id: proprietar_id };
        Animal.find(query)
          .sort({ registration_nr: 1 })
          .exec(function(err2, animals) {
            if (err2) {
              console.log(err2);
            } else {
              Reminder.find({ read: false })
                .sort({ date: 1 })
                .exec(function(err3, reminders) {
                  if (err3) {
                    console.log(err3);
                  } else {
                    var notifications = [];
                    reminders.forEach(reminder => {
                      if (
                        moment(reminder.date).isBefore(moment().add(+4, 'days'))
                      ) {
                        notifications.push(reminder);
                      }
                    });
                    res.render('proprietar/proprietar', {
                      proprietar: proprietar,
                      animals: animals,
                      errors: errors,
                      notifications: notifications
                    });
                  }
                });
            }
          });
      }
    });
  } else {
    // Create Animal
    let animal = new Animal();
    animal.registration_nr = req.body.registration_nr;
    animal.species = req.body.species;
    animal.quantity = req.body.quantity;
    animal.simptomatologie = req.body.simptomatologie;
    animal.diagnostic = req.body.diagnostic;
    animal.proprietar_id = req.params.proprietar_id;

    animal.save(function(err, object) {
      if (err) {
        console.log(err);
        return;
      } else {
        Proprietar.findById(req.params.proprietar_id, function(
          err2,
          proprietar
        ) {
          if (err2) {
            console.log(err2);
          } else {
            req.flash('success', 'Animal adaugat!');
            res.redirect('/animals/' + object._id + '/tratamente/add');
          }
        });
      }
    });
  }
});

// Edit Animal Route
router.get('/edit/:id', ensureAuthenticated, function(req, res) {
  Animal.findById(req.params.id, function(err, animal) {
    Reminder.find({ read: false })
      .sort({ date: 1 })
      .exec(function(err3, reminders) {
        if (err3) {
          console.log(err3);
        } else {
          var notifications = [];
          reminders.forEach(reminder => {
            if (moment(reminder.date).isBefore(moment().add(+4, 'days'))) {
              notifications.push(reminder);
            }
          });
          res.render('animal/edit_animal', {
            animal: animal,
            proprietar_id: req.params.proprietar_id,
            notifications: notifications
          });
        }
      });
  });
});

// Edit Route POST
router.post('/edit/:id', ensureAuthenticated, function(req, res) {
  // Check all required fields
  req
    .checkBody('registration_nr', 'Numarul de matricol este obligatoriu.')
    .notEmpty();
  req.checkBody('species', 'Specia animalului este obligatorie.').notEmpty();
  req
    .checkBody('quantity', 'Cantitatea de animale este obligatorie.')
    .notEmpty();
  req
    .checkBody('simptomatologie', 'Simptomatologia este obligatorie.')
    .notEmpty();
  req.checkBody('diagnostic', 'Diagnosticul este obligatoriu.').notEmpty();

  let proprietar_id = req.params.proprietar_id;

  // Get Errors
  let errors = req.validationErrors();

  if (errors) {
    Proprietar.findById(proprietar_id, function(err, proprietar) {
      if (err) {
        console.log(err);
      } else {
        Animal.findById(req.params.id, function(err2, animal) {
          if (err2) {
            console.log(err2);
          } else {
            let query = { animal_id: animal._id };
            Tratament.find(query, function(err3, tratamente) {
              res.render('animal/animal', {
                proprietar: proprietar,
                animal: animal,
                tratamente: tratamente,
                errors: errors
              });
            });
          }
        });
      }
    });
  } else {
    // Update Animal
    let animal = {};
    animal.registration_nr = req.body.registration_nr;
    animal.species = req.body.species;
    animal.quantity = req.body.quantity;
    animal.simptomatologie = req.body.simptomatologie;
    animal.diagnostic = req.body.diagnostic;

    let query = { _id: req.params.id };

    Animal.update(query, animal, function(err) {
      if (err) {
        console.log(err);
        return;
      } else {
        req.flash('success', 'Date actualizate.');
        res.redirect(
          '/proprietari/' +
            req.params.proprietar_id +
            '/animals/' +
            req.params.id
        );
      }
    });
  }
});

// Delete Animal Route
router.delete('/:id', ensureAuthenticated, function(req, res) {
  let query = { _id: req.params.id };
  Animal.remove(query, function(err) {
    if (err) {
      console.log(err);
    } else {
      Tratament.deleteMany({ animal_id: req.params.id }, function(err3) {
        if (err3) throw err3;
      });
      Reminder.deleteMany({ animal_id: req.params.id }, function(err4) {
        if (err4) throw err4;
      });
      req.flash('success', 'Animal sters cu succes.');
      res.send('Success');
    }
  });
});

// Single Animal Route
router.get('/:id', ensureAuthenticated, function(req, res) {
  Animal.findById(req.params.id, function(errA, animal) {
    if (errA) {
      console.log(errA);
    } else {
      Proprietar.findById(animal.proprietar_id, function(errP, proprietar) {
        if (errP) {
          console.log(errP);
        } else {
          Tratament.find({ animal_id: animal._id })
            .sort({ administration_date: 'desc' })
            .exec(function(errT, tratamente) {
              if (errT) {
                console.log(errT);
              } else {
                Reminder.find({ read: false })
                  .sort({ date: 1 })
                  .exec(function(err3, reminders) {
                    if (err3) {
                      console.log(err3);
                    } else {
                      var notifications = [];
                      reminders.forEach(reminder => {
                        if (
                          moment(reminder.date).isBefore(
                            moment().add(+4, 'days')
                          )
                        ) {
                          notifications.push(reminder);
                        }
                      });
                      res.render('animal/animal', {
                        animal: animal,
                        proprietar: proprietar,
                        tratamente: tratamente,
                        notifications: notifications
                      });
                    }
                  });
              }
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
