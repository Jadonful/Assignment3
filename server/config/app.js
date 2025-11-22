console.log(process.env.MONGO_URI);

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

// Database configuration
let mongoose = require('mongoose');
let DB = require('./db');

// Passport / Session
let session = require('express-session');
let passport = require('passport');
let passportLocal = require('passport-local');
let localStrategy = passportLocal.Strategy;
let flash = require('connect-flash');

// Models
let userModel = require('../model/user');
let User = userModel.User;

// Routers
var indexRouter = require('../routes/index');
var usersRouter = require('../routes/users');
let assignmentsRouter = require('../routes/assignments'); 
var app = express();


// MongoDB Connection


mongoose.connect(DB.URI);

let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error'));
mongoDB.once('open', () => {
  console.log('Connected to MongoDB Database');
});

// 
// Middleware Setup


app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Static folders
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));


// Passport Setup


app.use(session({
  secret: "SuperSecretKey123",
  saveUninitialized: false,
  resave: false
}));

app.use(flash());

// Passport Local Strategy
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(passport.initialize());
app.use(passport.session());


// View Engine


app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

// Routes


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/assignments', assignmentsRouter); 


// Error Handling


// 404 Handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Main Error Handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error', { title: 'Error' });
});

module.exports = app;
