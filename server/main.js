//----------------------------------------------------------------------------------------------------------------------
/// Main Application
///
/// @module
//----------------------------------------------------------------------------------------------------------------------

import logging from 'omega-logger';

//import io from 'socket.io';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';

// Auth
import serialization from './auth/serialization';
import personaAuth from './auth/persona';

// Routes
import routeUtils from './routes/utils';
import dashRouter from './routes/dashboard'
import rootRouter from './routes/root';

// Config
import config from '../config';

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

// Session support
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Store this in app.locals for socket.io to use later
app.locals.sessionMiddleware = session({
    secret: config.sessionSecret || 'nosecret',
    key: config.sessionKey || 'sid',
    resave: false,
    rolling: true,

    // maxAge = 12hrs
    cookie: { maxAge: 1000 * 60 * 60 * 12},
    saveUninitialized: false
    //saveUninitialized: true
});

// Use the session middleware
app.use(app.locals.sessionMiddleware);

// Set up out authentication support
app.use(passport.initialize());
app.use(passport.session());
personaAuth.initialize(app);

// Add our project version as a header
app.use(function(req, resp, next)
{
    resp.append('Version', require('../package').version);
    next();
});

// Routes
app.use('/dashboard', dashRouter);
app.use('/', rootRouter);

var server = app.listen(port);

//----------------------------------------------------------------------------------------------------------------------

logger.info('Qniform v%s started', require('../package').version);

//----------------------------------------------------------------------------------------------------------------------
