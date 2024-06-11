const express = require('express');
const app = express();
const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const passport = require('./auth');
require('dotenv').config();
const PORT = process.env.PORT


// Middleware Function
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
    next();
}
app.use(logRequest);

// Authentication
app.use(passport.initialize());
const Authentication = passport.authenticate('local', { session: false });

app.get('/', Authentication, (req, res) => {
    console.log("API IS UP NOW");
    res.send("API IS UP NOW");
})

const personRouter = require('./routes/person');

app.use('/person', personRouter);


app.listen(PORT, () => {
    console.log(`Server is up on port no ${PORT}`);
})

