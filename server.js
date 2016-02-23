process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Requiring dependencies
var mongoose = require('mongoose');

// Configure Mongoose
mongoose.connect('mongodb://joey:password@lamppost.17.mongolayer.com:10145/moodboard',
	function(err) {
    	if (err) throw err;
    });

// Configure Express
var express = require('./config/express');

// Express
var app = express();

// Bootstrap passport config
var passport = require('./config/passport')();

// Bootstrap application
app.listen(3000);

// Tell developer about it
console.log('Server running at http://localhost:3000/');
