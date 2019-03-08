const express = require('express');
const request = require('request');
const ejsLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const passport = require('./config/passportConfig');
const session = require('express-session');
const flash = require('connect-flash');
const isLoggedIn = require('./middleware/isLoggedIn');
const helmet = require('helmet');
require('dotenv').config();
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const db = require('./models');
const app = express();

app.set('view engine', 'ejs');
// app.use is used for every single route
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(helmet());
app.use(express.static("public"));


const sessionStore = new SequelizeStore({
  db: db.sequelize,
  expiration: 30 * 60 * 1000
});

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: sessionStore
}));

// Use this line once to set up the store table
// sessionStore.sync();

// This must come after the session and before passport
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/profile', isLoggedIn, function(req, res) {
  res.render('profile');
});

// app.get('/results', function(req, res) {
//   let edamamUrl = `https://api.edamam.com/search?q=${req.query.search}&app_id=${process.env.APP_ID}&app_key=${process.env.API_KEY}&from=0&to=9`;
//   request(edamamUrl, function(err, response, body) {
//     let favorite = JSON.parse(body).hits;
//     res.render('index', {favorite});
//     // res.json(recipes)
//   });
// });

app.use('/auth', require('./controllers/auth'));
app.use('/favorite', require('./controllers/favorite'));
app.use('/results', require('./controllers/results'));
app.use('/search', require('./controllers/search'));


var server = app.listen(process.env.PORT || 3000);

module.exports = server;
