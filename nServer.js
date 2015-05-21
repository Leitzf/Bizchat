var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
var url = require('url');
var app = express();

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
			NotificationID: Number,
			NotificationCode: Number,
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
			UserID: Number,
			EmailAddr: String,
			Password: String,
			Phone: String,
			SubscriptionList: [	{
				RoomID: Number
			}],
			Notifications: [Notifications]
		},
	   {collection: 'Users'}
	);
	Users = mongoose.model('Users', UserSchema);
	
	
	
	var MessageSchema = new Schema( 
		{
			RoomID: Number,
			MessageID: Number,
			userID: Number,
			Message: String, 
			TimeStamp: String
		},
	   {collection: 'Messages'}
	);
	Messages = mongoose.model('messages', MessageSchema);
	
	var RoomSchema = new Schema( 
		{
			RoomID: Number,
			Name: String,
			Description: String,
			PrivacyEnabled: Number,
			AllowedUsers: [{
				UserID: Number
			}],
			Messages: [Messages]
		},
	   {collection: 'Rooms'}
	);
	Rooms = mongoose.model('rooms', RoomSchema);
	console.log('models have been created');
});


function retrieveUserInfo(res, query) {
    var find = Users.findOne({'EmailAddr':'gparm@gmail.com'}, function(err, itemArray){
     console.log(itemArray);
     res.json(itemArray);
});

/*
	find.exec(function (err, itemArray) {
        console.log(itemArray);
		res.json(itemArray);
	});
    */
    
}


//serve static content for the app from the 'views' directory in the view

app.get('/app/lists/:listId/count', function (req, res) {
	var id = req.params.listId;
	console.log('Query single list with id: ' + id);
	retrieveTasksCount(res, {listId: id});
});

app.get('/user/:EmailAddr', function (req, res) {
	var id = req.params.userId;
	console.log('Query user info with id: ' + id);
	retrieveUserInfo(res, {EmailAddr: id});
});

app.use('/data', express.static(__dirname+'/data'));
app.use(express.static(__dirname+'/public'));
app.listen(8000);


