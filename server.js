// modules =================================================
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
    	console.log('An error occured on MongoDB connection.');
    	//throw err; // This make crash app if database connection don't work.
    } else {
    	console.log('Connected to ' + db.url);
    } 
});

// Get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT

// Static files location (/public/img will be /img for users)
app.use(express.static(__dirname + '/public')); 

// Routes ==================================================
// Pass our application into our routes
require('./app/routes')(app);

// Start app ===============================================
var port = process.env.PORT || 8080;
app.listen(port);
console.log('Website ready on port ' + port);
exports = module.exports = app;