const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  type: {
    
  },
  name: {

  },
  duration: {

  },
  weight: {

  },
  reps: {

  },
  sets: {

  },
  distance: {
    
  }
});

const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;
