const express = require('express');
const bodyParser = require('body-parser');
const helmet = require("helmet");
const morgan = require('morgan');
const cors = require('cors');

// Loads env variables
require('dotenv').config();

//Let heroku do its thing with the port
const PORT = process.env.PORT || 3001;

// add database connection
const db = require("./config/dbConnection");

// import routes
const authRoutesV1 = require('./routers/v1/auth');
const usersRoutesV1 = require('./routers/v1/users');
const postsRoutesV1 = require('./routers/v1/posts');

// Initializes express server
const app = express();

// CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS (Cross-origin resource sharing) with various options.
app.use(cors());
app.options('*', cors()) // include before other routes

// middleware

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Adds json parsing middleware to incoming requests
app.use(helmet());
app.use(morgan("common"));

// Routers, makes the app aware of routes in another folder
app.get('/', (req, res) => {
    res.send('Welcome to Social Network API');
})
app.use(`/api/v1/auth`, authRoutesV1);
app.use(`/api/v1/users`, usersRoutesV1);
app.use(`/api/v1/posts`, postsRoutesV1);


// database and Server is up and running
db.once("open", () => {
    app.listen(PORT, () => {
        console.log(`server is running 🌎!!! open 🔗 http://localhost:${PORT}`);
    });
})
