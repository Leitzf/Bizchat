var port = 8000;
var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
var url = require('url');
var app = express();
var gravatar = require('gravatar');
var io = require('socket.io').listen(app.listen(port));

// create application/json parser
var jsonParser = bodyParser.json();

var mongoDBConnection = require('./db.toDoSample.config');

var Users;
var Rooms;
var Messages;
var Notifications;


mongoose.connect(mongoDBConnection.uri);

mongoose.connection.on('open', function() {
	var Schema = mongoose.Schema;
	
	var NotificationSchema = new Schema( 
		{
			NotificationID: String,
			NotificationCode: String,
			TimeStamp: String,
			Sender: String,
			Message: String
		},
	   {collection: 'notifications'}
	);
	Notifications = mongoose.model('Notifications', NotificationSchema);
	
	var UserSchema = new Schema( 
		{
			Fname: String,
			Lname: String,
			Picture: String,
			UserID: String,
			EmailAddr: String,
			Password: String,
			Phone: String,
			SubscriptionList: [	{
				RoomID: String
			}],
			Notifications: [Notifications]
		},
	   {collection: 'Users'}
	);
	Users = mongoose.model('Users', UserSchema);
	
	
	
	var MessageSchema = new Schema( 
		{
			RoomID: String,
			MessageID: String,
			userID: String,
			Message: String, 
			TimeStamp: String
		},
	   {collection: 'Messages'}
	);
	Messages = mongoose.model('messages', MessageSchema);
	
	var RoomSchema = new Schema( 
		{
			RoomID: String,
			Name: String,
			UserID: String,
			Description: String,
			PrivacyEnabled: String,
			AllowedUsers: [{
				UserID: String
			}],
			Messages: [Messages]
		},
	   {collection: 'Rooms'}
	);
	Rooms = mongoose.model('rooms', RoomSchema);
	console.log('models have been created');
});


function retrieveUserInfo(res, query) {
    var find = Users.findOne(query, function(err, itemArray){
    res.json(itemArray);
});
}

function retrieveUsers(res, query) {
  	var query = Users.find({});
 	query.exec(function (err, itemArray) {
 		res.json(itemArray);		
 	});
 }

function retrieveRoomList(res, query) {
 	var query = Rooms.find({});
	query.exec(function (err, itemArray) {
		res.json(itemArray);		
	});
}

function retrieveRoom(res, query) {
 	var find = Rooms.findOne(query, function(err, itemArray){
	    res.json(itemArray);
	});
}

function getRoomCount() {
	var itemArray;
 	var query = Rooms.find({});
	query.exec(function (err, itemArray) {	
		return itemArray.length;
	});
	
}



//serve static content for the app from the 'views' directory in the view

app.get('/app/lists/:listId/count', function (req, res) {
	var id = req.params.listId;
	console.log('Query single list with id: ' + id);
	retrieveTasksCount(res, {listId: id});
});

app.get('/user/:userId', function (req, res) {
	var id = req.params.userId;
	console.log('Query user info with id: ' + id);
	retrieveUserInfo(res, {UserID: id});
});

app.get('/users/', function (req, res) {
	var id = req.params.userId;
	console.log('Query users');
	retrieveUsers(res, req);
});

app.get('/rooms/', function (req, res) {
	console.log('Query for all rooms');
	retrieveRoomList(res, req);
});

app.get('/rooms/:roomId', function (req, res) {
	var id = req.params.roomId;
	console.log('Query single room with id: ' + id);
	retrieveRoom(res, {RoomID: id});
});

app.get('/room/:roomId/join', function (req, res) {
	var id = req.params.roomId;
	console.log('Query single room with id: ' + id);
	retrieveRoom(res, {RoomID: id});
});

app.post('/addroom/', jsonParser, function(req, res) {
	console.log("Attempting to post");
	//var jsonObj = req.body;
	//jsonObj.RoomID = getRoomCount()+1;
	Rooms.create([jsonObj], function (err) {
		if (err) {
			console.log('object creation failed');
		}
	});
});

app.use('/data', express.static(__dirname+'/data'));
app.use(express.static(__dirname+'/public'));
app.listen(port);


