const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/populate", { useNewUrlParser: true });

app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/exercise.html"));
});

app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/stats.html"));
});

app.get("/api/workouts", (req, res) => {
    
    db.Workout.find({}).populate("exercises").then(workouts => {
        console.log(workouts);
        res.json(workouts)
    }).catch(err => {
        res.json(err);
    })
});


app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });