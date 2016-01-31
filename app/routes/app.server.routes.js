module.exports = function(app) {
	var index = require('../controllers/index.server.controller');
	app.route('/').get(index.render);

	var sandbox = require('../controllers/sandbox.server.controller');
	app.route('/api/v1/users/:username/data').get(sandbox.getusersdata);
};