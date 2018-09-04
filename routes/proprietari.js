const express = require('express');
const router = express.Router();
const moment = require('moment');

// Bring in Proprietar and User model
let Proprietar = require('../models/proprietar');
let Tratament = require('../models/tratament');
let Animal = require('../models/animal');
let Reminder = require('../models/reminder');
let User = require('../models/user');

// All Proprietar Route
router.get('/', ensureAuthenticated, function(req, res) {
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
                        moment(reminder.date).isBefore(moment().add(+4, 'days'))
                      ) {
                        notifications.push(reminder);
                      }
                    });
                    res.render('proprietar/proprietari', {
                      proprietari: proprietari,
                      animals: animals,
                      notifications: notifications
                    });
                  }
                });
            }
          });
      }
    });
});

// Add Route POST
router.post('/', ensureAuthenticated, function(req, res) {
  // Check Fields
  req.checkBody('name', 'Numule este obligatoriu').notEmpty();
  req.checkBody('address', 'Adresa este obligatorie').notEmpty();

  // Get Errors
  let errors = req.validationErrors();

  if (errors) {
    Proprietar.find({})
      .sort({ surname: 1 })
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
    // Create Proprietar
    let proprietar = new Proprietar();
    proprietar.name = req.body.name;
    proprietar.address = req.body.address;
    proprietar.phone = req.body.phone;

    proprietar.save(function(err, object) {
      if (err) {
        console.log(err);
        return;
      } else {
        req.flash(
          'success',
          'Proprietarul ' + object.name + ' a fost adaugat!'
        );
        res.redirect('/proprietari/' + object._id);
      }
    });
  }
});

router.post('/addAll', ensureAuthenticated, function(req, res) {
  // Create Proprietar
  let proprietar = new Proprietar();
  proprietar.name = req.body.proprietar_name;
  proprietar.address = req.body.proprietar_address;
  proprietar.phone = req.body.proprietar_phone;

  proprietar.save(function(err, proprietar_object) {
    if (err) {
      console.log(err);
    } else {
      // Create Animal
      let animal = new Animal();
      animal.registration_nr = req.body.animal_name;
      animal.species = req.body.animal_species;
      animal.quantity = req.body.animal_quantity;
      animal.simptomatologie = req.body.animal_simptomatologie;
      animal.diagnostic = req.body.animal_diagnostic;
      animal.proprietar_id = proprietar_object._id;

      animal.save(function(err2, animal_object) {
        if (err2) {
          console.log(err2);
        } else {
          // Create Tratament
          let tratament = new Tratament();
          let reminder = new Reminder();

          tratament.name = req.body.tratament_name;
          tratament.series = req.body.tratament_series;
          tratament.dose = req.body.tratament_dose;
          tratament.expiry_date = moment(
            req.body.tratament_expiry,
            'DD-MM-YYYY'
          ).toDate();
          tratament.administration_date = moment(
            req.body.tratament_date,
            'DD-MM-YYYY'
          ).toDate();
          tratament.waiting_time = req.body.tratament_waiting_time;
          tratament.duration = req.body.tratament_duration;
          tratament.result = req.body.tratament_result;
          tratament.observations = req.body.tratament_observations;
          tratament.animal_id = animal_object._id;

          tratament.save(function(err3, tratament_object) {
            if (err3) {
              console.log(err3);
            } else {
              if (tratament_object.result == 'Vindecat') {
                reminder.animal_id = animal_object._id;
                reminder.animal_name = animal_object.registration_nr;
                reminder.proprietar_id = animal_object.proprietar_id;
                reminder.tratament_id = tratament_object._id;
                reminder.tratament_name = tratament_object.name;
                reminder.date = moment(
                  tratament_object.administration_date,
                  'DD-MM-YYYY'
                )
                  .add(1, 'y')
                  .toDate();

                reminder.save(function(err4) {
                  if (err4) {
                    console.log(err4);
                  } else {
                    req.flash(
                      'success',
                      'Proprietar, Animal, Tratament adaugate!'
                    );
                    res.redirect('/proprietari/');
                  }
                });
              } else {
                req.flash('success', 'Proprietar, Animal, Tratament adaugate!');
                res.redirect('/proprietari/');
              }
            }
          });
        }
      });
    }
  });
});

router.post('/addAnimalAndTratament', ensureAuthenticated, function(req, res) {
  // Create Animal
  let animal = new Animal();
  animal.registration_nr = req.body.animal_name;
  animal.species = req.body.animal_species;
  animal.quantity = req.body.animal_quantity;
  animal.simptomatologie = req.body.animal_simptomatologie;
  animal.diagnostic = req.body.animal_diagnostic;
  animal.proprietar_id = req.body.proprietar_id;

  animal.save(function(err2, animal_object) {
    if (err2) {
      console.log(err2);
    } else {
      // Create Tratament
      let tratament = new Tratament();
      let reminder = new Reminder();

      tratament.name = req.body.tratament_name;
      tratament.series = req.body.tratament_series;
      tratament.dose = req.body.tratament_dose;
      tratament.expiry_date = moment(
        req.body.tratament_expiry,
        'DD-MM-YYYY'
      ).toDate();
      tratament.administration_date = moment(
        req.body.tratament_date,
        'DD-MM-YYYY'
      ).toDate();
      tratament.waiting_time = req.body.tratament_waiting_time;
      tratament.duration = req.body.tratament_duration;
      tratament.result = req.body.tratament_result;
      tratament.observations = req.body.tratament_observations;
      tratament.animal_id = animal_object._id;

      tratament.save(function(err3, tratament_object) {
        if (err3) {
          console.log(err3);
        } else {
          if (tratament_object.result == 'Vindecat') {
            reminder.animal_id = animal_object._id;
            reminder.animal_name = req.body.animal_name;
            reminder.proprietar_id = req.body.proprietar_id;
            reminder.tratament_id = tratament_object._id;
            reminder.tratament_name = tratament_object.name;
            reminder.date = moment(
              tratament_object.administration_date,
              'DD-MM-YYYY'
            )
              .add(1, 'y')
              .toDate();

            reminder.save(function(err4) {
              if (err4) {
                console.log(err4);
              } else {
                req.flash('success', 'Proprietar, Animal, Tratament adaugate!');
                res.redirect('/proprietari/');
              }
            });
          } else {
            req.flash('success', 'Proprietar, Animal, Tratament adaugate!');
            res.redirect('/proprietari/');
          }
        }
      });
    }
  });
});

// Edit Proprietar Route
router.get('/edit/:id', ensureAuthenticated, function(req, res) {
  Proprietar.findById(req.params.id, function(err, proprietar) {
    if (err) {
      console.log(err);
    } else {
      res.render('proprietar/edit_proprietar', {
        proprietar: proprietar
      });
    }
  });
});

// Edit Route POST
router.post('/edit/:id', ensureAuthenticated, function(req, res) {
  let proprietar = {};
  proprietar.name = req.body.name;
  proprietar.address = req.body.address;
  proprietar.phone = req.body.phone;

  let query = { _id: req.params.id };

  Proprietar.update(query, proprietar, function(err) {
    if (err) {
      console.log(err);
      return;
    } else {
      req.flash('success', 'Proprietarul a fost actualizat!');
      res.redirect('/proprietari/' + req.params.id);
    }
  });
});

// Delete Proprietar Route
router.delete('/:id', ensureAuthenticated, function(req, res) {
  let _id = { _id: req.params.id };
  let proprietar_id = { proprietar_id: req.params.id };
  Proprietar.deleteOne(_id, function(err1) {
    if (err1) {
      console.log(err1);
    } else {
      Animal.find(proprietar_id, function(errX, animals) {
        animals.forEach(function(animal) {
          Tratament.deleteMany({ animal_id: animal._id }, function(err3) {
            if (err3) throw err3;
          });
          Reminder.deleteMany({ animal_id: animal._id }, function(err4) {
            if (err4) throw err4;
          });
        });
        Animal.deleteMany(proprietar_id, function(err2) {
          req.flash(
            'success',
            'Proprietarul si animalele asociate au fost sterse.'
          );
          res.send('Success');
        });
      });
    }
  });
});

// Single Proprietar Route
router.get('/:id', ensureAuthenticated, function(req, res) {
  Proprietar.findById(req.params.id, function(err, proprietar) {
    if (err) {
      console.log(err);
    } else {
      Tratament.find({}, function(err2, tratamente) {
        if (err2) {
          console.log(err2);
        } else {
          Animal.find({ proprietar_id: req.params.id }, function(
            err3,
            animals
          ) {
            if (err3) {
              console.log(err3);
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
                      animals: animals,
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
    req.flash('info', 'Va rugam sa va autentificati.');
    res.redirect('/users/login');
  }
}

module.exports = router;
