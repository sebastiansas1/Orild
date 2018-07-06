const express = require('express');
const router = express.Router();

// Bring in Proprietar and User model
let Proprietar = require('../models/proprietar');
let Tratament = require('../models/tratament');
let Animal = require('../models/animal');
let User = require('../models/user');

// All Proprietar Route
router.get('/', function(req, res) {
  Proprietar.find({}).sort({ surname: 1}).exec(function(err, proprietari) {
    if(err) {
      console.log(err);
    } else {
      res.render('proprietar/proprietari', {
        title: 'Toti Proprietarii',
        proprietari: proprietari
      });  
    }
  });
});

// Add Route
router.get('/add', ensureAuthenticated, function(req, res) {
  res.render('proprietar/add_proprietar');
});

// Add Route POST
router.post('/add', function(req, res) {

  // Check Fields
  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('surname', 'Surname is required').notEmpty();
  req.checkBody('address', 'Address is required').notEmpty();

  // Get Errors
  let errors = req.validationErrors();

  if(errors) {
    res.render('proprietar/add_proprietar', {
      errors: errors
    });
  } else {

    // Create Proprietar
    let proprietar = new Proprietar();
    proprietar.name = req.body.name;
    proprietar.surname = req.body.surname;
    proprietar.address = req.body.address;
    proprietar.email = req.body.email;
    proprietar.created_by = req.user._id;
  
    proprietar.save(function(err) {
      if(err){
        console.log(err);
        return;
      } else {
        req.flash('success', 'Proprietar added!');
        res.redirect('/proprietari');
      }
    });
  }
});

// Edit Proprietar Route
router.get('/edit/:id', ensureAuthenticated, function(req, res) {
  Proprietar.findById(req.params.id, function(err, proprietar) {
    if(err) {
      console.log(err);
    } else {
      res.render('proprietar/edit_proprietar', {
        proprietar:proprietar 
      });
    }
  });
});

// Edit Route POST
router.post('/edit/:id', function(req, res) {
  let proprietar = {};
  proprietar.name = req.body.name;
  proprietar.surname = req.body.surname;
  proprietar.address = req.body.address;
  proprietar.email = req.body.email;

  let query = {_id:req.params.id};

  Proprietar.update(query, proprietar, function(err) {
    if(err){
      console.log(err);
      return;
    } else {
      req.flash('success', 'Proprietar updated!');
      res.redirect('/proprietari/'+req.params.id);
    }
  });
});

// Delete Proprietar Route
router.delete('/:id', ensureAuthenticated, function(req, res) {
  let query = {_id:req.params.id};
  let query2 = {proprietar_id:req.params.id};
  Proprietar.remove(query, function(err) {
    if(err){
      console.log(err);
    } 
    Animal.remove(query2, function(err) {
      if(err){
        console.log(err);
      }
      req.flash('success', 'Proprietar with its animals deleted!');
      res.send('Success');
    });
  });
});

// Single Proprietar Route
router.get('/:id', function(req, res) {
  Proprietar.findById(req.params.id, function(err, proprietar) {
    if(err) {
      console.log(err);
    } else {

      Tratament.find({}, function(err, tratamente) { 
        if(err) {
          console.log(err);
        } else {
          Animal.find({proprietar_id: req.params.id}, function(err, animals) {
            res.render('proprietar/proprietar', {
              animals: animals,
              proprietar: proprietar,
              tratamente: tratamente
            });
          });  
        }
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