const express = require('express');
const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());

// view engine
app.set('view engine', 'ejs');

// routes
app.get('/', (req, res) => res.render('home'));

app.listen(3000);
console.log('we are listening to port 3000');

