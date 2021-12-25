var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();

const loggerMode = process.env.NODE_ENV !== undefined ? process.env.NODE_ENV : 'dev'; 

app.use(logger(loggerMode));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);


module.exports = app;
