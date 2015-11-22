module.exports = function(app) {
	var mongoose = require('mongoose');

	// **************************** MODELS ****************************
	var Users = mongoose.model('Users', {
	    username : String, 
	    password : String
	});

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes

	// **************************** FRONTEND **************************

	// Users
	app.get('/api/users', function(req, res) {
        // use mongoose to get all todos in the database
        Users.find(function(err, todos) {
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)
            res.json(todos); // return all todos in JSON format
        });
    });
    
	// route to handle all angular requests
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});

};