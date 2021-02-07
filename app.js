const express = require('express');
const app = express();

// middleware
app.use(express.static('public'));
// view engine
app.set('view engine', 'ejs');

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/login.ejs', (req, res) => res.render('login'));
app.get('/signup.ejs', (req, res) => res.render('signup'));
app.get('/smoothies.ejs', (req, res) => res.render('smoothies'));
app.get('/pass.ejs', (req, res) => res.render('pass'));
app.get('/thank.ejs', (req, res) => res.render('thank'));
app.get('/buy.ejs', (req, res) => res.render('buy'));
app.get('/contact.ejs', (req, res) => res.render('contact'));
app.get('bd.js', (req, res) => res.render('bd'));
app.listen(3000);
console.log('we are listening to port 3000');

