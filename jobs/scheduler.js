require('dotenv').config();

console.log(process.env.MONGO_URI);

/* eslint-disable import/first */
import moment from 'moment-timezone';
import mongoose from 'mongoose';
import config from './api/config';
import logger from './api/utils/logger';
import { acceptNoArguments } from './api/utils/function';
import {
  clearLogMessagesOlderThan,
  hasTaskBeenRunToday,
  laterThan,
  startTask,
  finishTask
} from './shared';
/* eslint-enable import/first */

// Default everything to EST
moment.tz.setDefault('America/New_York');

logger.info('Running scheduled cron tasks for ' + (process.env.NODE_ENV || 'development') + ' environment at ' + moment().format('HH:mm'));

// Override mongoose promises
mongoose.Promise = global.Promise;

// Connect to database

// @TODO for some reason the normal mongo configuration from the project is not working here config.mongo.uri
mongoose.connect(process.env.MONGO_URI, config.mongo.options);

/* eslint-disable import/no-dynamic-require */
export default Promise.all([
  ((task) => {
    // Database backups should only run in production
    if (laterThan('06:00') && !hasTaskBeenRunToday(task) && process.env.NODE_ENV === 'production' && false) {
      return startTask(task)
        .then(acceptNoArguments(require(task)))
        .then(finishTask(task))
        .catch(finishTask(task, true));
    }
  })('./definitions/backup-database')
]).then(() => {
  logger.info('Clearing log messages older than 60 days.');
  // Timeout so that the logs have time to propagate
  setTimeout(() => {
    clearLogMessagesOlderThan(20);
    process.exit();
  }, 10000);
}).catch((err) => {
  logger.error('Task scheduler finished with errors: ' + err);
  process.exit();
});
/* eslint-enable import/no-dynamic-require */
