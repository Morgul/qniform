//----------------------------------------------------------------------------------------------------------------------
// Brief description for utils.js module.
//
// @module utils.js
//----------------------------------------------------------------------------------------------------------------------

var fs = require('fs');
var path = require('path');
var config = require('../../config');

//----------------------------------------------------------------------------------------------------------------------

// Basic request logging
function buildBasicRequestLogger(logger)
{
    return function(request, response, next)
    {
        if(config.debug)
        {
            logger.debug("%s %s '%s'", request.method, response.statusCode, request.url);
        } // end if

        next();
    }; // end loggerFunc
} // end buildBasicRequestLogger

// Basic error logging
function buildBasicErrorLogger(logger)
{
    return function(error, request, response, next)
    {
        logger.error("%s '%s': Error encountered: \n%s", request.method, request.url, error.stack);
        next(error);
    }; // end loggerFunc
} // end buildBasicErrorLogger

// Serve index
function buildServeIndex(directory)
{
    return function(request, response)
    {
        response.setHeader("Content-Type", "text/html");
        fs.createReadStream(path.resolve(directory, 'index.html')).pipe(response);
    }; // end serveIndex
} // end buildServeIndex

//----------------------------------------------------------------------------------------------------------------------

module.exports = {
    requestLogger: buildBasicRequestLogger,
    errorLogger: buildBasicErrorLogger,
    serveIndex: buildServeIndex
}; // end exports

//----------------------------------------------------------------------------------------------------------------------
