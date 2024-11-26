const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const passport = require('passport');
const authRoutes = require('./routes/authRoutes');
require('./config/passportConfig')(passport);
const connectDB = require('./config/db.js')
const app = express();
require('dotenv').config()
app.set('view engine', 'ejs');

const port = process.env.PORT || '8000';
const host = process.env.HOST || 'localhost'

// Middleware
//console.log('start')
app.use(express.urlencoded({ extended: true }));


// Session
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongoUrl: 'mongodb://localhost:27017/sessionDB2' }),
  cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));
//console.log('end');

//console.log('two')
app.use(passport.initialize());
//console.log('three')
app.use(passport.session());
//console.log('four')
app.use(flash());
//console.log('five')

// Routes
app.use(authRoutes);
//console.log('six')

// MongoDB Connection

const DATABASE_NAME = process.env.DATABASE_NAME
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;
connectDB(DATABASE_NAME, USERNAME, PASSWORD);

//console.log('seven')

// Start Server
app.listen(port, () => console.log(`Server is listening at http://${host}:${port}`));
//console.log('eight')