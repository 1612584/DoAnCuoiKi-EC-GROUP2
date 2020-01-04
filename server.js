const express = require('express')
const app = express()
const path = require('path');
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const flash = require('connect-flash');
var logger = require('morgan');
var cookieParser = require("cookie-parser");

// Config passport
require("./app/configs/passport")(passport);

// Router
const userRouter = require('./app/routes/user')
const sellerRouter = require("./app/routes/seller/index");
// const adminRouter = require("./app/routes/admin/index");
// const bidderRouter = require("./app/routes/bidder");
const guestRouter = require('./app/routes/guest');

// use morgan
app.use(logger("dev"));
// config dotenv
require("dotenv").config();
// view engine setup
app.set("views", path.join(__dirname, "/app/views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// Config req.body
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(cookieParser());

// express sesson
app.use(
  session({ secret: "doancuoiky", resave: true, saveUninitialized: true })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
// connect flash
app.use(flash());

// connect mongodb
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true, 
  useCreateIndex: true
});
mongoose.set('useFindAndModify', false);
// route
app.use('/user', userRouter)
app.use('/sellers',sellerRouter);
// app.use('/admin', adminRouter);
// app.use('/bidder', bidderRouter);
app.use('/', guestRouter);

app.listen(process.env.PORT||8083, () => { 
    console.log(`Example app listening on port ${process.env.PORT}!`)
})
