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
  date:{ 
    type: Date, 
    default: Date.now 
  },
  animal_id:{
    type: String
  }
});

let Tratament = module.exports = mongoose.model('Tratament', tratamentSchema);