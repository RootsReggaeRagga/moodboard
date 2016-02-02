var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SandboxSchema = new Schema({
	_username : String,
	images : [{
	    url: String,
	    link: String
	 }],
	apparences : {
		colorpalette: String
	}
});

mongoose.model('Sandbox', SandboxSchema);
