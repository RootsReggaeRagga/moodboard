module.exports = function(app) {
	var mongoose = require('mongoose');

	// **************************** MODELS ****************************
	var users = mongoose.model('users', {
	    firstname : String, 
	    lastname : String,
	    email : String, 
	    username : String, 
	    password: String
	});

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes

	// **************************** FRONTEND **************************
	// GET
	// All users
	app.get('/api/v1/users', function(req, res) {
        users.find(function(err, u) {
            if (err)
                res.send(err);
            res.json(u);
        });
    });

	// GET
	// Specific user
	app.get('/api/v1/users/:username', function(req, res) {
		var username = req.params.username;
        users.findOne({'username': username}, function(err, u){
            if (err)
                res.send(err);
            res.json(u);
		});
    });
    
	// route to handle all angular requests
	app.get('/', function(req, res) {
		res.sendfile('./public/index.html');
	});

	// Route to 404 page
	app.get('*', function(req, res) {
		res.sendfile('./public/error/404.html');
	});

};