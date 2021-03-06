//----------------------------------------------------------------------------------------------------------------------
// Routes for the dashboard page
//
// @module contact.js
//----------------------------------------------------------------------------------------------------------------------

import _ from 'lodash';
import express from 'express';
import logging from 'omega-logger';

import routeUtils from './utils';
import models from '../models';

//----------------------------------------------------------------------------------------------------------------------

var logger = logging.loggerFor(module);

var router = express.Router();

//----------------------------------------------------------------------------------------------------------------------
// Middleware
//----------------------------------------------------------------------------------------------------------------------

// Basic request logging
router.use(routeUtils.requestLogger(logger));

// Basic error logging
router.use(routeUtils.errorLogger(logger));

//----------------------------------------------------------------------------------------------------------------------
// REST Endpoints
//----------------------------------------------------------------------------------------------------------------------

router.get('/*', routeUtils.serveIndex('./dist'));

//----------------------------------------------------------------------------------------------------------------------

export default router;

//----------------------------------------------------------------------------------------------------------------------
