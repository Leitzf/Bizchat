var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
var url = require('url');
var app = express();

// create application/json parser
var jsonParser = bodyParser.json();
/*
var mongoDBConnection = require('./db.toDoSample.config');

var Users;
var Rooms;
var Messages;
var Notifications;

console.log(mongoDBConnection.uri);

mongoose.connect(mongoDBConnection.uri);
mongoose.connection.on('open', function() {
	var Schema = mongoose.Schema;
	
	var NotificationSchema = new Schema( 
		{
			NotificationID: Number,
			TimeStamp: String,
			Message: String
		},
	   {collection: 'notifications'}
	);
	Notifications = mongoose.model('notifications', TasksSchema);
	
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
	   {collection: 'users'}
	);
	Users = mongoose.model('Users', ListsSchema);
	
	
	
	var MessageSchema = new Schema( 
		{
			RoomID: Number,
			MessageID: Number,
			userID: Number,
			Message: String, 
			TimeStamp: String
		},
	   {collection: 'messages'}
	);
	Messages = mongoose.model('messages', TasksSchema);
	
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
	   {collection: 'rooms'}
	);
	Rooms = mongoose.model('rooms', TasksSchema);
	console.log('models have been created');
});

function retrieveAllLists(res) {
	var query = Lists.find({});
	query.exec(function (err, itemArray) {
		res.json(itemArray);
	});
}

function retrieveUserInfo(res, query) {
	var query = Tasks.findOne(query);
	query.exec(function (err, itemArray) {
		res.json(itemArray);		
	});
}

function retrieveTasksCount(res, query) {
	var query = Tasks.find({listId:1}).select('tasks').count();
	query.exec(function (err, numberOfTasks) {
		console.log('number of tasks: ' + numberOfTasks);
		res.json(numberOfTasks);
	});
}

*/

//serve static content for the app from the 'views' directory in the view



app.use('/data', express.static(__dirname+'/data'));
app.use(express.static(__dirname+'/public'));
app.listen(8000);


