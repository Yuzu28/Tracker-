const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); //is used to help connect to the mongoDB

require('dotenv').config();

//make the express server and the port it will be on
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json()); //allow us to parse json data

const uri = process.env.ATLAS_URI; //mongoDB URI
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true,
    useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});