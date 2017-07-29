import _ from 'lodash';
import fs from 'fs-extra';
import moment from 'moment-timezone';
import mongodbRestore from 'mongodb-restore';
import path from 'path';
import targz from 'targz';
import { exec } from 'child-process-promise';
import config from '../api/config';
import { mkdirPSync } from '../api/utils/file';
import sThreeFilestore from '../api/third-party/aws-s3-filestore';

function cleanup(cleanupPath) {
  return exec('rm -rf tmp').then(_.constant(cleanupPath));
}

if (process.env.NODE_ENV) {
  const logger = require('../api/utils/logger');
  const dateArgument = process.argv[2];
  const restoreFromEnvironment = process.argv[3];

  if (moment(dateArgument, 'YYYY-MM-DD').isValid()) {
    if (_.includes(['development', 'staging', 'production'], restoreFromEnvironment)) {
      mkdirPSync('tmp');

      const fileName = _.template('<%= date %>-<%= environment %>.tar.gz')({
        date: dateArgument,
        // This is set here, so that development always pulls down the production backup
        environment: restoreFromEnvironment
      });
      const filePath = path.join('tmp', fileName);

      sThreeFilestore.getDbBackup(restoreFromEnvironment, fileName, fs.createWriteStream(filePath)).then(() => {
        return new Promise((resolve, reject) => {
          const uncompressedFilePath = path.join('tmp', dateArgument);
          targz.decompress({
            src: filePath,
            dest: uncompressedFilePath
          }, (err) => {
            if (err) {
              logger.error(_.template('Decompressing archive <%= path %> failed with error: ')({ path: uncompressedFilePath }) + err);
              reject(err);
            } else {
              mongodbRestore({
                uri: config.mongo.uri,
                root: uncompressedFilePath,
                drop: true,
                callback(subErr) {
                  if (subErr) {
                    logger.error(_.template('Database restore for <%= date %> failed with error: ')({ date: dateArgument }) + subErr);
                    reject(subErr);
                  } else {
                    logger.info(_.template('Completed database restore for <%= date %>.')({ date: dateArgument }));
                    resolve();
                  }
                }
              });
            }
          });
        });
      }).catch((err) => {
        logger.error(_.template('Database restore for <%= date %> failed with error: ')({ date: dateArgument }) + err);
        process.exit();
      }).then(cleanup)
        .then(() => {
          logger.info('Finishing restore.');
          process.exit();
        });
    } else {
      logger.error('You must pass in an environment to restore from (development, staging, production).');
    }
  } else {
    logger.error('You must pass in a valid date string as your argument in YYYY-MM-DD format.');
  }
} else {
  console.log('You must specify the NODE_ENV environment variable (either development, staging, or production).');
}
