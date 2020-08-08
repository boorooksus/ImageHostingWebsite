var express = require('express');
var app = express();
var port = 3000;
var fs = require('fs')
var bodyParser = require('body-parser');
var compression = require('compression');
var topicRouter = require('./routes/topic.js');
var indexRouter = require('./routes/index.js');
//var db = require('./lib/db.js');

var helmet = require('helmet');

app.use(helmet());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(compression());

// get에 대해서만 적용되는 middleware. db에 맞게 고칠것
app.get('*', function(request, response, next){
   next();
})

app.use('/topic', topicRouter);
app.use('/', indexRouter);

app.use(function (req, res, next){
    res.status(404).send("Wrong access!")
})

app.use(function (err, req, res, next){
    console.error(err,stack)
    res.status(500).send('Someting broke!')
})

app.listen(port, () => console.log(`app listening at http://localhost:${port}`))