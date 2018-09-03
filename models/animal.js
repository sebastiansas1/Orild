const mongoose = require('mongoose');

const AnimalSchema = mongoose.Schema({
  registration_nr: {
    type: String,
    required: true
  },
  species: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  simptomatologie: {
    type: String
  },
  diagnostic: {
    type: String
  },
  proprietar_id: {
    type: String
  }
});

const Animal = (module.exports = mongoose.model('Animal', AnimalSchema));
