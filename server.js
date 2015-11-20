// Modules =================================================
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');

// Configuration ===========================================
	
// Database connection
var db = require('./config/mongodb_config');
mongoose.connect(db.url, function(err) {
    if (err) {
    	throw err;
    } else {
    	console.log('Connected to ' + db.url);
    } 
});

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

// Routes ==================================================
require('./app/routes')(app); // pass our application into our routes

// Start app ===============================================
var port = process.env.PORT || 8080;
app.listen(port);
exports = module.exports = app;


// Console informations
console.log('Website ready on port ' + port);