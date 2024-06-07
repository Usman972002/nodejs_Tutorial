const express = require('express');
const app = express();
const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', (req, res) => {
    console.log("API IS UP NOW");
    res.send("API IS UP NOW");
})

const personRouter = require('./routes/person');

app.use('/person',personRouter);


app.listen(3000, () => {
    console.log("Server is up on port no 3000");
})

