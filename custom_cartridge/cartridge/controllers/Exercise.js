'use strict';

var server = require('server');
var Logger = require('dw/system/Logger');

var debugLog = Logger.getLogger("debug123", "customDebug");
debugLog.debug("This is the first category a debug");

var warnLog = Logger.getLogger("warn123", "customWarn");
warnLog.warn("This is the second category a warn");

var errorLog = Logger.getLogger("error123", "testError");
errorLog.error("This is the third category an error");

var advancedCustomLog = Logger.getLogger("MyAdvancedCustomLog","customInfo");
var greeting = "of advance message on custom log";
advancedCustomLog.info("This are a {0} exercise {1}", 1, greeting);

//var infoLog = Logger.getLogger("info_custom", "customInfo");
//infoLog.info("This the fourth category an info");

server.get('Show', function (req, res, next){
        res.render('/exercise/logRender', {
            info : infoLog
        });

        next();
    }
);

module.exports = server.exports();