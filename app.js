var express = require('express');
var app = express();
var http = require ('http').createServer(app);
var io = require('socket.io')(http);
var port = 3000;

app.use(express.static(__dirname + '/public'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/'));
app.use('/swal', express.static(__dirname + '/node_modules/sweetalert2/dist/'));

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

//Home Page
app.get("/", function(req, res){
    res.render("index");
});

http.listen(port, 'localhost', function(){
  console.log("Listening on port " + port);
});
