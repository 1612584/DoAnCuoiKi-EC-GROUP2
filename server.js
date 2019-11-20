const express = require('express');
//import express from 'express';
const app = express();
// var models = require('./models');
//
var path = require('path')
var serveStatic = require('serve-static')

const Sequelize = require('sequelize');

//var bookRouter = require('./routes/books')
var hbs = require('express-handlebars');

//define engine name hbs, use hbs to create handlebars
app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));

app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
}));


app.get('', (req, res) => {
    res.render('home');
});
//use following line to explicit layout you want to use
app.get('/manage', (req, res) => {
    res.render('home', { layout: 'manageLayout' }); //explicit 'manageLayout.hbs' instead of default layout 'layout.hbs'
});





// var userRouter = require('./routes/users');
// app.use('/users', userRouter);
app.listen(process.env.PORT || 8083, function() {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});