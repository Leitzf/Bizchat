var http = require('http');
var url = require('url');
var express = require('express');
var server = http.createServer(app);

//serve static content. website won't load without
app.use(express.static(__dirname+'/public'));


var port = process.env.PORT || 3000;
server.listen(port, function() {
	console.log("Express server listening on port " + port);
});
