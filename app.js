var express = require('express');
var app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.listen(3005);
app.get('/', function(req, res) {
    res.render('index');
});
