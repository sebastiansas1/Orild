let mongoose = require('mongoose');

let tratamentSchema = mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  series:{
    type: String
  },
  dose:{
    type: String,
    required: true
  },
  expiry_date:{
    type: Date
  },
  waiting_time:{
    type: String
  },
  duration:{
    type: String
  },
  result:{
    type: String
  },
  signature:{
    type: String
  },
  observations:{
    type: String
  },
  administration_date:{ 
    type: Date, 
    default: Date.now 
  },
  animal_id:{
    type: String
  }
});

let Tratament = module.exports = mongoose.model('Tratament', tratamentSchema);