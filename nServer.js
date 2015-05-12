var express = require('express');
var url = require('url');
var app = express();


//serve static content for the app from the 'views' directory in the view

app.use('/data', express.static(__dirname+'/data'));
app.use(express.static(__dirname+'/public'));
app.listen(8000);


