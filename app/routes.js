module.exports = function(app) {
	var mongoose = require('mongoose');
	var passport = require('passport');
	var expressSession = require('express-session');

	// **************************** PASSPORT **************************
	app.use(expressSession({secret: 'mySecretKey'}));
	app.use(passport.initialize());
	app.use(passport.session());

	var isAuthenticated = function (req, res, next) {
	  if (req.isAuthenticated()) {
	  	return next();
	  } else {
	  	res.redirect('/unauthorized');
	  }
	}

	// **************************** MODELS ****************************
	var users = mongoose.model('users', {
	    firstname : String, 
	    lastname : String,
	    email : String, 
	    username : String, 
	    password: String
	});

	var sandboxes = mongoose.model('sandboxes', {
	    _username : String, 
	    images : [{ 
				    url: String, 
				    link: String 
				 }], 
	    apparences : { 
	    			backgroundcolor: String, 
	    			actionbarcolor: String 
	    			}
	});

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes

	// **************************** FRONTEND **************************
	// GET
	// All users
	app.get('/api/v1/users', function(req, res) {
        users.find(function(err, u) {
            if (err) {
                res.send(err);
            } else {
            	res.json(u);
            }
        });
    });

	// GET
	// Specific user
	app.get('/api/v1/users/:username/data', function(req, res) {
		var username = req.params.username;
        sandboxes.findOne({'_username': username}, function(err, u){
            if (err) {
                res.send(err);
            } else {
            	console.log(res);
            	console.log(u);
            	res.json(u);
            }
		});
    });

    app.get('/settings', isAuthenticated, function(req, res) {
		res.sendfile('./public/views/settings.html');
	});

	// GET
	// Specific user
	app.post('/api/v1/users/login', function(req, res) {
		var username = req.body.username;
		var password = req.body.password;
        users.findOne({'username': username, 'password': password}, function(err, u) {
            if (u) {
                return res.status(200).json({status: 'Registration successful!'});
            } else {
            	return res.status(500).send(err);
            }
		});
    });
    
	// route to handle all angular requests
	app.get('/', function(req, res) {
		res.sendfile('./public/index.html');
	});

	app.get('/unauthorized', function(req, res) {
		res.sendfile('./public/error/401.html');
	});

	app.get('/notsupported', function(req, res) {
		res.sendfile('./public/error/412.html');
	});

	

	// Route to 404 page
	/*app.get('*', function(req, res) {
		res.sendfile('./public/error/404.html');
	});*/

};