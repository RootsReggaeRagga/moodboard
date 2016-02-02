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
	    Sandbox.findOne({'_username': username}, function(err, doc){
	        if (err) {
	            res.send(err);
	        } else {
	        	res.json(doc);
	        }
		});
	} else {
	    res.send('401.Unauthorized');
	}
};

exports.putusercolorpalette = function(req, res) {
	if (req.user) {
		var username = req.params.username;
		var colorPalette = req.body.colorpalette;
		Sandbox.findOne({'_username': username}, function(err, doc){
	        if (err) {
	            res.send(err);
	        } else {
	        	doc.apparences.colorpalette = colorPalette;
	        	doc.save();
	        	res.json('Success');
	        }
		});

	} else {
	    res.send('401.Unauthorized');
	}
};
