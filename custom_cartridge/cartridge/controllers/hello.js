var server = require('server');

server.get('Show', function(req, res, next){
    res.render('home/hello');
    next();
});

module.exports = server.exports();