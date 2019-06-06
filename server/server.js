var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors());

var bodyParser = require('body-parser');
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send({ express: 'Hello From Express' });
});














app.listen(5200, function(){ console.log(' ~~ listening on port 5200!')});

