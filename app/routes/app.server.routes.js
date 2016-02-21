module.exports = function(app) {
	var index = require('../controllers/index.server.controller');
	app.route('/').get(index.render);

	var sandbox = require('../controllers/sandbox.server.controller');

	/* [GET] Methods */
    app.route('/api/v1/users/:username/data').get(sandbox.getusersdata);
    app.route('/api/v1/users/:username/infos').get(sandbox.getusersinfos);
	
	/* [PUT] Methods */
	app.route('/api/v1/users/:username/data/settings').put(sandbox.putSettings);

	/* [POST] Methods */

	/* [DELETE] Methods */
};
