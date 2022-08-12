const express = require('express');
const bodyParser = require('body-parser');
const helmet = require("helmet");
const morgan = require('morgan');
const cors = require('cors');

const PORT = process.env.PORT || 3001;

// add database connection
const db = require("./config/dbConnection");

// import routes
const apiRoutes = require('./routers');

// Initializes express server
const app = express();

// CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS (Cross-origin resource sharing) with various options.
app.use(cors());
app.options('*', cors()) // include before other routes

// get public files
app.use(express.static('public'));

// middleware

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Adds json parsing middleware to incoming requests
app.use(helmet());
app.use(morgan("common"));

//Root route
app.get('/', (req, res) => {
    res.status(300).redirect('/info.html');
});

// Routers, makes the app aware of routes in another folder
app.use(apiRoutes);

// database and Server is up and running
db.once("open", () => {
    app.listen(PORT, () => {
        console.log(`server is running 🌎!!! open 🔗 http://localhost:${PORT}`);
    });
})
