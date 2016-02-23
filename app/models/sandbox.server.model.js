var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SandboxSchema = new Schema({
	_username : String,
	images : [{
	    url: String,
	    link: String,
	    rotate: Number,
	    scale: Number
	 }],
	videos : [{
	    url: String
	 }],
	apparences : {
		colorpalette: String
	},
	settings : {
		privacy: String
	}
});

mongoose.model('Sandbox', SandboxSchema);
