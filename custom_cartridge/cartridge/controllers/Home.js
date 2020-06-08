'use strict';
var server = require('server');
server.extend(module.superModule);
var num = require('../scripts/esp').numero();

server.prepend('Show', function (req, res, next) {
	var viewData = res.getViewData();
	viewData.param1 = { test: 'prepend'};
	res.setViewData(viewData);
	next();
});

server.append('Show', function (req, res, next) {
	var viewData = res.getViewData();
	viewData.param2 = { test: num};
	res.setViewData(viewData);
	next();
});

/* server.replace('Show', function (req, res, next) {
	res.render("home/homePage");
	next();
}); */

module.exports = server.exports();