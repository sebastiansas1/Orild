const express = require('express');
const router = express.Router({ mergeParams: true });

// Bring in Animal and User model
let Animal = require('../models/animal');
let Proprietar = require('../models/proprietar');
let User = require('../models/user');

// Add Route
router.get('/add', ensureAuthenticated, function(req, res) {
  res.render('animal/add_animal', {
    title: 'Add Animal',
    proprietar_id: req.params.proprietar_id
  });
});

// Add Route POST
router.post('/add', function(req, res) {

  // Check Fields
  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('type', 'Type is required').notEmpty();
  req.checkBody('age', 'Age is required').notEmpty() ;

  // Get Errors
  let errors = req.validationErrors();

  if(errors) {
    res.render('animal/add_animal', {
      errors: errors
    });
  } else {
    // Create Animal
    let animal = new Animal();
    animal.name = req.body.name;
    animal.type = req.body.type;
    animal.age = req.body.age;
    animal.created_by = req.user._id;
    animal.proprietar_id = req.params.proprietar_id;

    animal.save(function(err) {
      if(err) {
        console.log(err);
        return;
      } else {
        req.flash('success', 'Animal added!');
        res.redirect('/proprietari/'+req.params.proprietar_id);
      }
    })
  }
});

// Edit Animal Route
router.get('/edit/:id', ensureAuthenticated, function(req, res) {
  Animal.findById(req.params.id, function(err, animal) {
    res.render('animal/edit_animal', {
      animal: animal,
      proprietar_id: req.params.proprietar_id
    });
  });
});

// Edit Route POST
router.post('/edit/:id', function(req, res) {
  let animal = {};
  animal.name = req.body.name;
  animal.type = req.body.type;
  animal.age = req.body.age;

  let query = {_id:req.params.id};

  Animal.update(query, animal, function(err) {
    if(err){
      console.log(err);
      return;
    } else {
      req.flash('success', 'Animal updated!');
      res.redirect('/proprietari/'+req.params.proprietar_id+'/animals/'+req.params.id);
    }
  });
});

// Delete Animal Route
router.delete('/:id', ensureAuthenticated, function(req, res) {
  let query = {_id:req.params.id};
  Animal.remove(query, function(err) {
    if(err){
      console.log(err);
    } 
    req.flash('success', 'Animal deleted!');
    res.send('Success');
  });
});

// Single Animal Route
router.get('/:id', function(req, res) {
  Animal.findById(req.params.id, function(err, animal) {
    if(err) {
      console.log(err);
    } else {
      Proprietar.findById(animal.proprietar_id, function(err, proprietar) {
        res.render('animal/animal', {
          animal:animal,
          proprietar: proprietar
        });
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