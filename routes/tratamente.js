const express = require('express');
const router = express.Router({ mergeParams: true });

// Bring in Tratament model
const Tratament = require('../models/tratament');
const Animal = require('../models/animal');

// Add Route
router.get('/add', ensureAuthenticated, function (req, res) { 
  res.render('tratament/add_tratament', {
    animal_id: req.params.animal_id
  });
});

// Add Tratament [POST]
router.post('/add', function (req, res) {

  // Check Fields
  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('dose', 'Name is required').notEmpty();

  // Get Errors
  let errors = req.validationErrors();

  if(errors) {
    res.render('tratament/add_tratament', {
      errors: errors
    });
  } else {
    let tratament = new Tratament();
    tratament.name = req.body.name;
    tratament.series = req.body.series;
    tratament.dose = req.body.dose;
    tratament.waiting_time = req.body.waiting_time;
    tratament.duration = req.body.duration;
    tratament.result = req.body.result;
    tratament.signature = req.body.signature;
    tratament.observations = req.body.observations;
    tratament.date = req.body.date;
    tratament.animal_id = req.params.animal_id;

    tratament.save(function(err) {
      if(err) {
        console.log(err);
      } else {
        req.flash('success', 'Tratament adaugat!');
        res.redirect('/proprietari/');
      }
    });
  }

});

// Edit Route
router.get('/edit/:tratament_id', ensureAuthenticated, function (req, res) {
  Tratament.findById(req.params.tratament_id, function(err, tratament) {
    if(err) {
      console.log(err);
    } else {
      res.render('tratament/edit_tratament', {
        tratament: tratament
      });
    }
  });
});

// Access Control
function ensureAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  } else {
    req.flash('info', 'Please login');
    res.redirect('/users/login');
  }
}

module.exports = router;