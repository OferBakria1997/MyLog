const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

//enviroment varibles in DMV file
require('dotenv').config();


//create my express server
const app = express();
const port = process.env.SERVER_PORT;

app.use(cors());
app.use(express.json());//to send and recieve JSON

//connect to mongo db
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);

const UserRouter=require('./routes/user');
app.use('/user',UserRouter)

const ExerciseRouter=require('./routes/exercise');
app.use('/exercise',ExerciseRouter)

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

//to start the server listening  
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});