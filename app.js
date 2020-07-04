const express = require('express')
const app = express();

app.get('/', function(req, res, next) {
  console.log("Someone is trying to reach our page!");
  next();
})

app.get('/', function(req, res) {
  res.send('Home Page');
  console.log("Home page reached.");
})

app.get('/problems/:number', function(req, res) {
  res.send('The number you specified is ' + req.params.number);
})

app.get('*', function(req, res) {
  res.send('Sorry, this is an invalid URL.');
})


app.listen(3000, 'localhost', () => console.log('Example app listening on port 3000'));
