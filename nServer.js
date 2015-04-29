var express = require('express');
var url = require('url');
var app = express();

//serve static content for the app from the 'pages' directory in the app dir

app.use(express.static(__dirname+'/views'));
app.listen(8000);
