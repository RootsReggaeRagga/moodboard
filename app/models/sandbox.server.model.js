var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SandboxSchema = new Schema({
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

mongoose.model('Sandbox', SandboxSchema);