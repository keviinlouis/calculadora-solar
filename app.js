var express = require('express');
var app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
var porta = process.env.PORT || 8080;
app.listen(porta);
app.get('/', function(req, res) {
    res.render('index');
});
