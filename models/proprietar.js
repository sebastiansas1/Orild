const mongoose = require('mongoose');

const ProprietarSchema = mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  surname:{
    type: String,
    required: true
  },
  address:{
    type: String,
    required: true
  },
  email:{
    type: String
  }
});

const Proprietar = module.exports = mongoose.model('Proprietar', ProprietarSchema);