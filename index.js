// index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const signupRoute = require('./routes/signup');
const signinRoute = require('./routes/signin');
require('dotenv').config()
// Create an Express app
const app = express();

// Configure body-parser middleware to parse request bodies
app.use(bodyParser.json());
app.use(express.json())
// Connect to the MongoDB database
// mongodb://localhost:27017/mydatabase
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Define the routes
app.use(signupRoute);
app.use(signinRoute);
app.get('/', (req, res) => { res.send("Welcome To This Api"); })
// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
