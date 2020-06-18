const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExercisesSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  duration: Number,
  date: Date,
});

module.exports = mongoose.model('exercises', ExercisesSchema);
