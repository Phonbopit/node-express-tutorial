const express = require('express');

const app = express();

// app.set('views', __dirname + '/views');

app.use(express.static('views'));
app.set('view engine', 'pug');

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about', {
    message: 'This is sent from app.js file'
  });
});

app.listen(3000);
