import feathers from 'feathers';
import morgan from 'morgan';
import session from 'express-session';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import hooks from 'feathers-hooks';
import rest from 'feathers-rest';
import socketio from 'feathers-socketio';
import isPromise from 'is-promise';
import PrettyError from 'pretty-error';
import mongoose from 'mongoose';
import moment from 'moment-timezone';

/* We need the config before we move forward */
require('dotenv').config();

/* eslint-disable import/first */
import config from './config';
import middleware from './middleware';
import services from './services';
import * as actions from './actions';
import { mapUrl } from './utils/url.js';
import auth, { socketAuth } from './services/authentication';
import logger from './utils/logger';
/* eslint-enable import/first */


process.on('unhandledRejection', error => logger.error(error));

const pretty = new PrettyError();
const app = feathers();

/* Mongoose Setup */
mongoose.Promise = global.Promise;
mongoose.connect(config.mongo.uri, config.mongo.options);

/* Default everything to EST */
moment.tz.setDefault('America/New_York');

app.set('config', config)
  .use(morgan('dev'))
  .use(cookieParser())
  .use(session({
    secret: 'react and redux rule!!!!',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
  }))
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json());

const actionsHandler = (req, res, next) => {
  const splittedUrlPath = req.url.split('?')[0].split('/').slice(1);
  const { action, params } = mapUrl(actions, splittedUrlPath);

  req.app = app;

  const catchError = error => {
    logger.error('API ERROR:', pretty.render(error));
    res.status(error.status || 500).json(error);
  };

  if (action) {
    try {
      const handle = action(req, params);
      (isPromise(handle) ? handle : Promise.resolve(handle))
        .then(result => {
          if (result instanceof Function) {
            result(res);
          } else {
            res.json(result);
          }
        })
        .catch(reason => {
          if (reason && reason.redirect) {
            res.redirect(reason.redirect);
          } else {
            catchError(reason);
          }
        });
    } catch (error) {
      catchError(error);
    }
  } else {
    next();
  }
};

app.configure(hooks())
  .configure(rest())
  .configure(socketio({ path: '/ws' }))
  .configure(auth)
  .use(actionsHandler)
  .configure(services)
  .configure(middleware);

if (process.env.APIPORT) {
  app.listen(process.env.APIPORT, err => {
    if (err) {
      logger.error(err);
    }
    logger.info('----\n==> API is running on port %s', process.env.APIPORT);
    logger.info('==> Send requests to http://localhost:%s', process.env.APIPORT);
  });
} else {
  logger.error('==> ERROR: No APIPORT environment variable has been specified');
}

const bufferSize = 100;
const messageBuffer = new Array(bufferSize);
let messageIndex = 0;

app.io.use(socketAuth(app));

app.io.on('connection', socket => {
  const user = socket.feathers.user ? { ...socket.feathers.user, password: undefined } : undefined;
  socket.emit('news', { msg: '\'Hello World!\' from server', user });

  socket.on('history', () => {
    for (let index = 0; index < bufferSize; index++) {
      const msgNo = (messageIndex + index) % bufferSize;
      const msg = messageBuffer[msgNo];
      if (msg) {
        socket.emit('msg', msg);
      }
    }
  });

  socket.on('msg', data => {
    const message = { ...data, id: messageIndex };
    messageBuffer[messageIndex % bufferSize] = message;
    messageIndex++;
    app.io.emit('msg', message);
  });
});
