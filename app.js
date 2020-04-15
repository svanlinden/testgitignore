const morgan = require('morgan');
const router = require('./routes/personenRouter');
const express = require('express');
const app = express();

app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.json());


app.use('/api', router);


module.exports = app;