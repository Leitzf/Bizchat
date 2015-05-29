var port = 8000;
var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
var url = require('url');
var app = express();
var gravatar = require('gravatar');
//var io = require('socket.io').listen(app.listen(port));

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
			DateDestroy: String,
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

app.get('/room/join/:roomId', function (req, res) {
	var id = req.params.roomId;
	console.log('Joining room with id: ' + id);
	//retrieveRoom(res, {RoomID: id});
});

app.post('/addroom/', jsonParser, function(req, res) {
	//console.log("Attempting to post");
	var jsonObj = req.body;
	Rooms.count({}, function( err, count){
		//Incrementing count for unique ids
		
		while (Rooms.find({'RoomID': { "$in": count } }).count() > 0){
			++count;
			console.log("Count: "count);
		}
	    jsonObj.RoomID = count + 1;
		console.log("RoomID: " + jsonObj.RoomID);
		Rooms.create([jsonObj], function (err) {
			if (err) {
				console.log('Room creation failed');
			}
		});
	});

});

app.put('/editroom/:roomId', jsonParser, function(req, res) {
	console.log("Attempting to update");
	var jsonObj = req.body;
	var query = { RoomID: req.params.roomId };
	Rooms.update(query, jsonObj);
});

app.delete('/deleteroom/:roomId', jsonParser, function(req, res) {
	console.log("Attempting to delete " + req.params.roomId );
	Rooms.remove( { RoomID: { $eq: req.params.roomId } }, true )

});

/*
var chat = io.on('connection', function (socket) {

	// When the client emits the 'load' event, reply with the 
	// number of people in this chat room

	socket.on('load',function(data){

		var room = findClientsSocket(io,data);
		if(room.length === 0 ) {

			socket.emit('peopleinchat', {number: 0});
		}
		else{ //if(room.length === 1) {

			socket.emit('peopleinchat', {
				number: room.length,
				user: room[0].username,
				avatar: room[0].avatar,
				id: data
			});
		}
	});

	// When the client emits 'login', save his name and avatar,
	// and add them to the room
	socket.on('login', function(data) {

		var room = findClientsSocket(io, data.id);
		// Only two people per room are allowed
		if (1==1) {  //room.length < 2) {

			// Use the socket object to store data. Each client gets
			// their own unique socket object

			socket.username = data.user;
			socket.room = data.id;
			socket.avatar = gravatar.url(data.avatar, {s: '140', r: 'x', d: 'mm'});

			// Tell the person what he should use for an avatar
			socket.emit('img', socket.avatar);


			// Add the client to the room
			socket.join(data.id);

			if (room.length >= 1) {

				var usernames = [],
					avatars = [];

				usernames.push(room[0].username);
				usernames.push(socket.username);

				avatars.push(room[0].avatar);
				avatars.push(socket.avatar);

				// Send the startChat event to all the people in the
				// room, along with a list of people that are in it.

				chat.in(data.id).emit('startChat', {
					boolean: true,
					id: data.id,
					users: usernames,
					avatars: avatars
				});
			}
		}
	});

	// Somebody left the chat
	socket.on('disconnect', function() {

		// Notify the other person in the chat room
		// that his partner has left

		socket.broadcast.to(this.room).emit('leave', {
			boolean: true,
			room: this.room,
			user: this.username,
			avatar: this.avatar
		});

		// leave the room
		socket.leave(socket.room);
	});


	// Handle the sending of messages
	socket.on('msg', function(data){

		// When the server receives a message, it sends it to the other person in the room.
		socket.broadcast.to(socket.room).emit('receive', {msg: data.msg, user: data.user, img: data.img});
	});
});

function findClientsSocket(io,roomId, namespace) {
	var res = [],
		ns = io.of(namespace ||"/");    // the default namespace is "/"

	if (ns) {
		for (var id in ns.connected) {
			if(roomId) {
				var index = ns.connected[id].rooms.indexOf(roomId) ;
				if(index !== -1) {
					res.push(ns.connected[id]);
				}
			}
			else {
				res.push(ns.connected[id]);
			}
		}
	}
	return res;
}

*/

app.use('/data', express.static(__dirname+'/data'));
app.use(express.static(__dirname+'/public'));
app.listen(port);


