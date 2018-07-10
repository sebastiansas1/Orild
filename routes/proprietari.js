const express = require("express");
const router = express.Router();

// Bring in Proprietar and User model
let Proprietar = require("../models/proprietar");
let Tratament = require("../models/tratament");
let Animal = require("../models/animal");
let User = require("../models/user");

// All Proprietar Route
router.get("/", ensureAuthenticated, function(req, res) {
  Proprietar.find({}).sort({ name: 1 }).exec(function(err, proprietari) {
    if (err) {
      console.log(err);
    } else {
      Animal.find({}).sort({ registration_nr: 1 }).exec(function(err2, animals) {
        if(err2) {
          console.log(err2);
        } else {
          res.render("proprietar/proprietari", {
            proprietari: proprietari,
            animals:animals
          });
        }
      });
    }
  });
});

// Add Route POST
router.post("/", ensureAuthenticated, function(req, res) {
  // Check Fields
  req.checkBody("name", "Numule este obligatoriu").notEmpty();
  req.checkBody("address", "Adresa este obligatorie").notEmpty();

  // Get Errors
  let errors = req.validationErrors();

  if (errors) {
    Proprietar.find({})
    .sort({ surname: 1 })
    .exec(function(err, proprietari) {
      if (err) {
        console.log(err);
      } else {
        Animal.find({}).sort({ registration_nr: 1 }).exec(function(err2, animals) {
          if(err2) {
            console.log(err2);
          } else {
            res.render("proprietar/proprietari", {
              proprietari: proprietari,
              animals: animals,
              errors: errors
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
    proprietar.email = req.body.email;
    proprietar.phone = req.body.phone;

    proprietar.save(function(err, object) {
      if (err) {
        console.log(err);
        return;
      } else {
        req.flash("success", "Proprietarul "+object.name+" a fost adaugat!");
        res.redirect("/proprietari/");
      }
    });
  }
});

// Edit Proprietar Route
router.get("/edit/:id", ensureAuthenticated, function(req, res) {
  Proprietar.findById(req.params.id, function(err, proprietar) {
    if (err) {
      console.log(err);
    } else {
      res.render("proprietar/edit_proprietar", {
        proprietar: proprietar
      });
    }
  });
});

// Edit Route POST
router.post("/edit/:id", ensureAuthenticated, function(req, res) {
  let proprietar = {};
  proprietar.name = req.body.name;
  proprietar.address = req.body.address;
  proprietar.phone = req.body.phone;
  proprietar.email = req.body.email;

  let query = { _id: req.params.id };

  Proprietar.update(query, proprietar, function(err) {
    if (err) {
      console.log(err);
      return;
    } else {
      req.flash("success", "Proprietarul a fost actualizat!");
      res.redirect("/proprietari/" + req.params.id);
    }
  });
});

// Delete Proprietar Route
router.delete("/:id", ensureAuthenticated, function(req, res) {
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
        });
        Animal.deleteMany(proprietar_id, function(err2) {
          req.flash("success", "Proprietarul si animalele asociate ar fost sterse.");
          res.send("Success");
        });
      });
    }
  });
});

// Single Proprietar Route
router.get("/:id", ensureAuthenticated, function(req, res) {
  Proprietar.findById(req.params.id, function(err, proprietar) {
    if (err) {
      console.log(err);
    } else {
      Tratament.find({}, function(err, tratamente) {
        if (err) {
          console.log(err);
        } else {
          Animal.find({ proprietar_id: req.params.id }, function(err, animals) {
            res.render("proprietar/proprietar", {
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
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash("info", "Va rugam sa va autentificati inainte de a proceda.");
    res.redirect("/users/login");
  }
}

module.exports = router;
