'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var passport = require('passport');
var Sandbox = mongoose.model('Sandbox');

exports.getusersdata = function(req, res) {
	// TODO: Here, first check if the username has a public moodboard.
	// If the moodboard is public, ok --> return data.
	// Else return 401 error.
	var username = req.params.username;
    Sandbox.findOne({'_username': username}, function(err, doc){
        if (err) {
            res.send(err);
        } else {
        	res.json(doc);
        }
	});
};

exports.putusercolorpalette = function(req, res) {
	if (req.user) {
		var username = req.params.username;
		var colorPalette = req.body.colorpalette;
		var privacy = req.body.privacy;
		Sandbox.findOne({'_username': username}, function(err, doc){
	        if (err) {
	            res.send(err);
	        } else {
	        	doc.apparences.colorpalette = colorPalette;
	        	doc.settings.privacy = privacy;
	        	doc.save();
	        	res.json('Settings updated for user ' + username);
	        }
		});

	} else {
	    res.send('401.Unauthorized');
	}
};
