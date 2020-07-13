const express = require("express");
const db = require("../models");
const router = express.Router();

router.get("/api/workouts", (req, res) => {
    const now = new Date()
    console.log(now)
    
    db.Workout.find({}).then(workouts => {
        const result = workouts.map(workout => {
            const workoutObject = workout.toObject();
            workoutObject.totalDuration = workout.exercises.reduce((totalDur, exercise) => totalDur + exercise.duration, 0);

            return workoutObject;
        });
        
        console.log(result);
        res.json(result);
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

        console.log("FIRED!")
        
        const collatedWorkoutArray = workouts.reduce((fixedArray, workout, i) => {

            //if there are more than one workout in a given day this monstrosity will collate all the workouts into a single one

            if(fixedArray.length === 0){
                fixedArray.push(workout);
            } else if(new Date(fixedArray[fixedArray.length -1].day).getDay() === new Date(workout.day).getDay() ){
                //If days are the same then collate

                fixedArray[fixedArray.length -1].exercises = [
                    ...fixedArray[fixedArray.length -1].exercises,
                    ...workout.exercises
                ];
            } else {
                
                fixedArray.push(workout);
            }

            return fixedArray

        },[]);

        //arrange workouts so that sunday is first so that the graph works properly
        collatedWorkoutArray.sort((a, b) => {
            return new Date(a.day).getDay() - new Date(b.day).getDay()
        });
        
        console.log(collatedWorkoutArray);
        res.send(collatedWorkoutArray);
    })
})

module.exports = router
