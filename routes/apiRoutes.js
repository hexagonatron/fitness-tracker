const express = require("express");
const db = require("../models");
const router = express.Router();

router.get("/api/workouts", (req, res) => {
    const now = new Date()
    console.log(now)
    
    db.Workout.find({}).then(workouts => {
        res.json(workouts)
    }).catch(err => {
        res.json(err);
    })
});

router.post("/api/workouts", (req, res) => {
    const workout = req.body;

    db.Workout.create(workout).then(result => {
        console.log(result);

        res.json(result);
    })
})

router.put("/api/workouts/:id", (req, res) => {
    const exercise = req.body;
    const workoutId = req.params.id

    console.log(req.body)
    console.log(workoutId)

    db.Workout.findById(workoutId).then(workout => {
        
        workout.exercises.push(exercise);
        workout.save().then(result => {
            res.json(result);
        })
        
    })
})

router.get("/api/workouts/range", (req, res) => {

    //gets the unix epoch time seconds for a week ago
    const weekAgo = Date.now() - 1000 * 60 * 60 * 24 * 7;

    db.Workout.find({day:{$gte: weekAgo}}).then(workouts => {
        console.log(workouts);
        res.send(workouts);
    })
})

module.exports = router