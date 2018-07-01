const mongoose = require('mongoose');

const AnimalSchema = mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  type:{
    type: String,
    required: true
  },
  age:{
    type: Number,
    required: true
  },
  created_by:{
    type: String
  },
  proprietar_id:{
    type: String
  }
});

const Animal = module.exports = mongoose.model('Animal', AnimalSchema);