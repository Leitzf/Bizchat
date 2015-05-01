var express = require('express');
var url = require('url');
var app = express();
var fs = require('fs');
var obj;

//serve static content for the app from the 'views' directory in the view


app.use(express.static(__dirname+'/views'));
app.listen(8000);


