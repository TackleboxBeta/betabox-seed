import _ from 'lodash';
import winston from 'winston';
import { mkdirPSync } from './file';

// Ensure log directory exists
mkdirPSync('./log');

// Instantiate the file logging, if we already have one, it comes from the task project
winston.add(winston.transports.File, {
  dirname: 'log', filename: _.template('<%= NODE_ENV %>.log')(process.env), timestamp: true, maxsize: 10000000
});

export default winston;
