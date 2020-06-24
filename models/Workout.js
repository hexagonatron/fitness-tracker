const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type: Number,
    default: Date.now
  }, 
  exercises: [
    {
      type: {
        type: String
      },
      name: {
        type: String
      },
      duration: {
        type: Number,
        default: 0
        
      },
      weight: {
        type: Number,
        default: 0
        
      },
      reps: {
        type: Number,
        default: 0
        
      },
      sets: {
        type: Number,
        default: 0
        
      },
      distance: {
        type: Number,
        default: 0
        
      }
    }
  ]
});

WorkoutSchema.methods.setTotalDuration = function() {
  this.totalDuration = this.exercises.reduce((totalDur, exercise) => totalDur + exercise.duration, 0);

  return this.totalDuration
}


const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
