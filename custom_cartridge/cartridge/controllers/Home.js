'use strict';
var server = require('server');
server.extend(module.superModule);

server.prepend('Show', function (req, res, next) {
	var viewData = res.getViewData();
	viewData.param1 = { test: 'prepend'};
	res.setViewData(viewData);
	next();
});

server.append('Show', function (req, res, next) {
	var viewData = res.getViewData();
	viewData.param2 = { test: 'append'};
	res.setViewData(viewData);
	next();
});

module.exports = server.exports();
