let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let contactsRouter = require('../routes/contact');

// Modules for authentication

let session = require('express-session');
let passport = require('passport');
let passportlocal = require('passport-local');
let localStrategy = passport.Strategy;
let flash = require('connect-flash');



// MongoDB connection configuration
let mongoose= require('mongoose');
let DB = require('./db');
mongoose.connect(DB.URI,{useNewUrlParser:true,useUnifiedTopology:true});

let mongoDB = mongoose.connection;
mongoDB.on('error',console.error.bind(
  console,'Connection Error:'
));
mongoDB.once('open',() =>
{
  console.log('Connected to MongoDB...');
});


let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

// Setup express session

app.use(session({
  secret:"Some Secret",
  saveUninitialized:false,
  resave:false
}));

// Initialize flash
app.use(flash());

// Initialize Passport

app.use(passport.initialize());
app.use(passport.session());

// usermodel instance

let userModel = require('../models/user');
let User = userModel.User;
passport.use(User.createStrategy());

// serialize and deserialize user info
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/contact-list',contactsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error',{title:'Error'});
});

module.exports = app;
