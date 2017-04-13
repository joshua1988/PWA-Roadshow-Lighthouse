var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');

app.set('views', path.join(__dirname));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static(__dirname));
app.use(bodyParser.json());
router.get('/', function(req, res, next) {
    res.render('index.html');
});

app.listen(3000);
console.log("Server running on port 3000");
