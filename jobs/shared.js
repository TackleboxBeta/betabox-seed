import _ from 'lodash';
import fs from 'fs-extra';
import moment from 'moment-timezone';
import path from 'path';
import logger from './api/utils/logger';
import { escapeForRegExp } from './api/utils/string';

const logFileName = _.template('kindra-<%= NODE_ENV %>.log')(process.env);
const logFilePath = path.join('log', logFileName);

function logRows() {
  if (fs.existsSync(logFilePath)) {
    return fs.readFileSync(logFilePath, 'utf8').split('\n');
  } else {
    return [];
  }
}

export function hasTaskBeenRunToday(name) {
  const today = moment();
  const startRe = new RegExp('^START TASK: ' + escapeForRegExp(name) + '$');
  return !!_.chain(logRows())
    .compact()
    .map(_.ary(JSON.parse, 1))
    .find((row) => startRe.test(row.message) && moment(row.timestamp).isSame(today, 'day'))
    .value();
}

export function startTask(name) {
  if (name) {
    logger.info('START TASK: ' + name);
    return Promise.resolve(name);
  } else {
    return Promise.reject('You have not specified a name for the task you wish to start.');
  }
}

export function finishTask(name, error) {
  return function (message) {
    if (name) {
      error ? logger.error('FINISH TASK WITH ERROR: ' + name + ': ' + message) : logger.info('FINISH TASK: ' + name);
      return Promise.resolve(name);
    } else {
      return Promise.reject('You have not specified a name for the task you wish to finish.');
    }
  };
}

export function laterThan(time) {
  return moment().isAfter(moment(time, 'HH:mm'));
}

export function clearLogMessagesOlderThan(days) {
  if (fs.existsSync(logFilePath)) {
    days = days || 60;
    const cutoff = moment().startOf('day').subtract(days, 'days');
    fs.writeFileSync(logFilePath,
      _.chain(logRows())
        .compact()
        .map(_.ary(JSON.parse, 1))
        .reject((row) => moment(row.timestamp).isBefore(cutoff))
        .map(_.ary(JSON.stringify, 1))
        .join('\n')
        .value() + '\n'
    );
  }
}
