var express = require('express')
  , passport = require('passport')
  , util = require('util')
  , ejs = require('ejs')
  , http = require('http')
  , morgan = require('morgan')
  , bodyParser = require('body-parser')
  , methodOverride = require('method-override')
  , cookieParser = require('cookie-parser')
  , expressSession = require('express-session')
  , FacebookStrategy = require('passport-facebook').Strategy;
  
var http = require('http');
var mongoose = require('mongoose');
var mongoStore = require('connect-mongo')({session: expressSession});
var bodyParser = require('body-parser')
var url = require('url');

var app = express();

//initialize passport
app.use(passport.initialize());
app.use(passport.session());
app.use(express.Router());

var server = http.createServer(app);
var gravatar = require('gravatar');
//var io = require('socket.io').listen(app.listen(port));

// create application/json parser
var jsonParser = bodyParser.json();


//Facebook authentication
var FACEBOOK_APP_ID = "1572468029682034";
var FACEBOOK_APP_SECRET = "56b92a5ccb70019a8ee1a24d4087afa9";

//connect to mongoDB server
var mongoDBConnection = require('./db.toDoSample.config');
mongoose.connect(mongoDBConnection.uri);



passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
	callbackURL: "http://bizchattest.azurewebsites.net/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      
      // To keep the example simple, the user's Windows Live profile is returned
      // to represent the logged-in user.  In a typical application, you would
      // want to associate the Windows Live account with a user record in your
      // database, and return that user instead.
      return done(null, profile);
    });
  }
));


var Users;
var Rooms;
var Messages;
var Notifications;




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

function retrieveUserInfoEmail(res, query) {
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

function retrieveMessages(res, query) {
 	var query = Messages.find({});
	query.exec(function (err, itemArray) {
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


app.get('/messages/', function(req, res){	
	retrieveMessages(res, req);
});

app.post('/addMessage/', jsonParser, function(req, res) {
	//console.log("Attempting to post");
	var jsonObj = req.body;
	Messages.count({}, function( err, count){
		//Incrementing count for unique ids
		
		while (Messages.find({'MessageID': { "$in": count } }).count() > 0){
			++count;
			console.log("Count: "+count);
		}

	    jsonObj.MessageID = count + 1;
		console.log("MessageID: " + jsonObj.MessageID);
		Rooms.create([jsonObj], function (err) {
			if (err) {
				console.log('Message post failed');
			}
		});
	});
});

app.get('/rooms/', function (req, res) {
	retrieveRoomList(res, req);
});



app.get('/rooms/:roomId', function (req, res) {
	var id = req.params.roomId;
	retrieveRoom(res, {RoomID: id});
});

app.get('/room/join/:roomId', function (req, res) {
	var id = req.params.roomId;
	console.log('Joining room with id: ' + id);
	//retrieveRoom(res, {RoomID: id});
});

app.get('/mainpage/:email', function (req, res) {
	var id = req.params.email;
	retrieveUser(res, {RoomID: id});
});

//serve static content. website won't load without
app.use(express.static(__dirname+'/public'));


app.post('/addroom/', jsonParser, function(req, res) {
	//console.log("Attempting to post");
	var jsonObj = req.body;
	Rooms.count({}, function( err, count){
		//Incrementing count for unique ids
		
		while (Rooms.find({'RoomID': { "$in": count } }).count() > 0){
			++count;
			console.log("Count: "+count);
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
	console.log(" Attempting to Update");
	var id = req.params.roomId;
	console.log("Attempting to update " + id);
	var jsonObj = req.body;
	console.log(jsonObj._id);
	console.log("Update"+JSON.stringify(jsonObj));

	//var query = { _id : jsonObj._id }; //old query
	Rooms.update(
		 { RoomID : jsonObj.RoomID } ,  
    	 jsonObj  ,
    	  function (err, num) {
			if (err) {
				console.log('Room edit failed '+num);
			}else{
				console.log("Works");
			}
		});
});

app.delete('/deleteroom/:roomId', jsonParser, function(req, res) {
	console.log("Attempting to delete " + req.params.roomId );
	Rooms.remove( { RoomID: { $eq: req.params.roomId } }, true )
});



//AUTHENTICATION

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/')
}

app.get('/auth/facebook',
  passport.authenticate('facebook', { scope: ['public_profile', 'email'] }),
  function(req, res){
    // The request will be redirected to Facebook for authentication, so
    // this function will not be called.
  });

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  });
  

// GET /auth/facebook/callback 
//   Use passport.authenticate() as route middleware to authenticate the 
//   request.  If authentication fails, the user will be redirected back to the 
//   login page.  Otherwise, the primary route function function will be called, 
//   which, in this example, will redirect the user to the home page. 
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/#/main/');
  });

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});


//SOCKETIO
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

var port = process.env.PORT || 3000;
server.listen(port, function() {
	console.log("Express server listening on port " + port);
});
