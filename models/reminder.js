const mongoose = require('mongoose');

const ReminderSchema = mongoose.Schema({
  date: {
    type: String,
    required: true
  },
  animal_id: {
    type: String
  },
  animal_name: {
    type: String
  },
  tratament_id: {
    type: String
  },
  tratament_name: {
    type: String
  },
  proprietar_id: {
    type: String
  },
  read: {
    type: Boolean,
    default: false
  }
});

const Reminder = (module.exports = mongoose.model('Reminder', ReminderSchema));
