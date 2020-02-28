const express = require('express');
const app = express();

const showLog = (req, res, next) => {
  console.log('showLog');

  next();
};

app.use(showLog);

app.use((req, res, next) => {
  console.log('the second log before app.get(`/`)');
  next();
});

app.get('/users/:id', (req, res, next) => {
  console.log('request user params', req.params);
  next();
});

app.get('/', (req, res) => {
  res.send('Ahoy!');
});

app.listen(3000);
