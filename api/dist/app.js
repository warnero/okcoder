"use strict";

const express = require('express');

const path = require('path');

const cookieParser = require('cookie-parser');

const bodyParser = require('body-parser'); // import { default as genet, logger } from 'genet-api-framework';
// import './config/dynamoose';


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser()); // import routes from './config/routes';
// genet.setupRoutes(app, routes, 'api-auth-service', process.env.NODE_ENV);
// logger.info('Auth Service Routes applied...');

module.exports = app;