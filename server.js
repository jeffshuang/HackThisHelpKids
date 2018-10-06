var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log('Server listening at port %d', port);
});

// set the view engine to ejs
app.set('view engine', 'ejs');

// Routing
var router = express.Router();

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));
app.use("/",router);

router.get("/",function(req,res){
  res.render("index");
});


router.get("/sell",function(req,res){
  var hash = req.param('hash');
  console.log(hash)
  res.render('sellingpage', {hash: hash});
});
