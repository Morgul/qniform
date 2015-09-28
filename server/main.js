//----------------------------------------------------------------------------------------------------------------------
/// Main Application
///
/// @module
//----------------------------------------------------------------------------------------------------------------------

import logging from 'omega-logger';

//import io from 'socket.io';
import express from 'express';

import config from '../config';

// Routes
import routeUtils from './routes/utils';
import rootRouter from './routes/root';

//----------------------------------------------------------------------------------------------------------------------

// If we're configured for debug, default to debug level logging
if(config.debug)
{
    logging.defaultConsoleHandler.level = 'DEBUG';
} // end if

// If an environment variable is set, override any other logging level defaults.
if(process.env.LOG_LEVEL)
{
    logging.defaultConsoleHandler.level = logging.getLevel(process.env.LOG_LEVEL);
} // end if

var logger = logging.loggerFor(module);

//----------------------------------------------------------------------------------------------------------------------

var port = config.http.port || 8080;
var app = express();

// Basic request logging
app.use(routeUtils.requestLogger(logger));

// Basic error logging
app.use(routeUtils.errorLogger(logger));

// Routes
app.use(rootRouter);

var server = app.listen(port);

//----------------------------------------------------------------------------------------------------------------------

logger.info('Qniform v%s started', require('../package').version);

//----------------------------------------------------------------------------------------------------------------------
