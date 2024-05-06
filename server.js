require("dotenv").config();

const workoutRoutes = require('./Routes/workouts');

const express=require('express');

const mongoose = require('mongoose');

// express app
const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log('Path : ${req.path},Method: ${req.path}');
    next();
});

app.use('/api/workouts', workoutRoutes);

//connect to db
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        //listen to request
        app.listen(process.env.PORT, () => {
            console.log("Connected to db and listening to port:", process.env.PORT);
        });
    })
    .catch(error => {
        console.log("Error in connection db");
    });