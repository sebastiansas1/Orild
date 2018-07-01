const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const config = require('./config/database');

// MIDDLEWARE CONFIGURATION

mongoose.connect(config.database);

let db = mongoose.connection;

// Check db connection
db.once('open', function(){
  console.log('Connected to mongoDB');
});

// Check for db errors
db.on('error', function(err){
  console.log(err);
})
// Init App
const app = express();

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Session Middleware
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}))

// Express Messages Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// Express Validator Middleware
app.use(expressValidator());

// Passport Config
require('./config/passport')(passport);
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Global User Variable
app.get('*', function(req, res, next) {
  res.locals.user = req.user || null;
  next();
});

// Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Routes

// Home Route
app.get('/', function(req, res) {
  res.render('home', {
    title: 'Homepage'
  });
}); 

// Bring in Animal model
let Animal = require('./models/animal');

// All Animals Route
app.get('/animals/', function(req, res) {
  Animal.find({}, function(err, animals) {
    if(err) {
      console.log(err);
    } else {
      res.render('animal/animals', {
        animals: animals
      });  
    }
  });
});

let proprietari = require('./routes/proprietari');
let animals = require('./routes/animals', {mergeParams: true});
let users = require('./routes/users');

app.use('/proprietari', proprietari);
proprietari.use('/:proprietar_id/animals', animals);
app.use('/users', users);

// Start Server
app.listen(3000, function() {
  console.log('Server started on port 3000');
});
  