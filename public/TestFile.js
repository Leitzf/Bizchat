console.log('starting test');
var chai = require('chai');
var chaiHttp = require('chai-http');
var async = require('async');

var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();

var http = require('http');
chai.use(chaiHttp);

describe('Test Room List result', function () {
	this.timeout(15000);

	var requestResult;
	var response;
		 
	before(function(done) {
		chai.request('localhost:3000')
			.get('/rooms/')
			.end(function (err, res) {
				requestResult = res.body;
				response = res;
				done();
			});
			
	});
	
	it('Should return an array object with multiple room objects', function(done){
		expect(response).to.have.status(200);
		expect(requestResult).to.be.an.object;
		expect(requestResult).to.have.length.above(1);
		expect(response).to.have.headers;
		done();
	});
	it('The first entry in the array has known properties', function(done){
		expect(requestResult[0]).to.include.keys('Name');
		expect(response).to.have.deep.property('body[0].RoomID', '3');
		expect(response.body).to.not.be.a.string;
		done();
	});

	it('The elements in the array have the expected properties', function(done){
		expect(response.body).to.satisfy(
			function (body) {
				for (var i = 0; i < body.length; i++) {
					expect(body[i]).to.have.property('Name');
					expect(body[i]).to.have.property('UserID');
					expect(body[i]).to.have.property('Description');
					expect(body[i]).to.have.property('PrivacyEnabled');
					expect(body[i]).to.have.property('DateDestroy');
					expect(body[i]).to.have.property('AllowedUsers');
					expect(body[i]).to.have.property('Messages');
				}
				return true;
			});
		done();
	});	
	
});

describe('Test Message List result', function () {
	this.timeout(15000);

	var requestResult;
	var response;
		 
	before(function(done) {
		chai.request('localhost:3000')
			.get('/messages/')
			.end(function (err, res) {
				requestResult = res.body;
				response = res;
				done();
			});
			
	});
	
	it('Should return an array object with multiple message objects', function(done){
		expect(response).to.have.status(200);
		expect(requestResult).to.be.an.object;
		expect(requestResult).to.have.length.above(0);
		expect(response).to.have.headers;
		done();
	});
	it('The first entry in the array has known properties', function(done){
		expect(requestResult[0]).to.include.keys('RoomID');
		expect(response).to.have.deep.property('body[0].MessageID', '0');
		expect(response.body).to.not.be.a.string;
		done();
	});

	it('The elements in the array have the expected properties', function(done){
		expect(response.body).to.satisfy(
			function (body) {
				for (var i = 0; i < body.length; i++) {
					expect(body[i]).to.have.property('RoomID');
					expect(body[i]).to.have.property('MessageID');
					expect(body[i]).to.have.property('Message');
					expect(body[i]).to.have.property('TimeStamp');
				}
				return true;
			});
		done();
	});	
	
});

describe('Test Users List result', function () {
	this.timeout(15000);

	var requestResult;
	var response;
		 
	before(function(done) {
		chai.request('localhost:3000')
			.get('/users/')
			.end(function (err, res) {
				requestResult = res.body;
				response = res;
				done();
			});
			
	});
	
	it('Should return an array object with multiple user objects', function(done){
		expect(response).to.have.status(200);
		expect(requestResult).to.be.an.object;
		expect(requestResult).to.have.length.above(0);
		expect(response).to.have.headers;
		done();
	});
	it('The first entry in the array has known properties', function(done){
		expect(requestResult[0]).to.include.keys('Fname');
		expect(response).to.have.deep.property('body[0].UserID', '1');
		expect(response.body).to.not.be.a.string;
		done();
	});

	it('The elements in the array have the expected properties', function(done){
		expect(response.body).to.satisfy(
			function (body) {
				for (var i = 0; i < body.length; i++) {
					expect(body[i]).to.have.property('Fname');
					expect(body[i]).to.have.property('Lname');
					expect(body[i]).to.have.property('Picture');
					expect(body[i]).to.have.property('UserID');
					expect(body[i]).to.have.property('EmailAddr');
					expect(body[i]).to.have.property('Phone');
					expect(body[i]).to.have.property('SubscriptionList');
					expect(body[i]).to.have.property('Notifications');
				}
				return true;
			});
		done();
	});	
	
});

describe('Test Retrieving A Room by RoomID result', function () {
	this.timeout(15000);

	var requestResult;
	var response;
		 
	before(function(done) {
		chai.request('localhost:3000')
			.get('/rooms/3')
			.end(function (err, res) {
				requestResult = res.body;
				response = res;
				done();
			});
			
	});
	
	it('Should return a room object with the information relating to WTF is node.js', function(done){
		expect(response).to.have.status(200);
		expect(requestResult).to.be.an.object;
		expect(response).to.have.headers;
		expect(requestResult).to.have.property('Name', 'WTF is node.js');
		expect(requestResult).to.have.property('RoomID', '3');
		done();
	});


	it('The object have the expected properties', function(done){
		expect(response.body).to.satisfy(
			function (body) {
				expect(body).to.have.property('Name');
				expect(body).to.have.property('UserID');
				expect(body).to.have.property('Description');
				expect(body).to.have.property('PrivacyEnabled');
				expect(body).to.have.property('DateDestroy');
				expect(body).to.have.property('AllowedUsers');
				expect(body).to.have.property('Messages');
				return true;
			});
		done();
	});	
	
});

