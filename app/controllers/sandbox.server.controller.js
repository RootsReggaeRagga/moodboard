'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var passport = require('passport');
var Sandbox = mongoose.model('Sandbox');

exports.getusersdata = function(req, res) {
	if (req.user) {
		var username = req.params.username;
	    Sandbox.findOne({'_username': username}, function(err, u){
	        if (err) {
	            res.send(err);
	        } else {
	        	res.json(u);
	        }
		});
	} else {
	    res.send('401.Unauthorized');
	}
};