import _ from 'lodash';
import fs from 'fs-extra';
import moment from 'moment-timezone';
import mongodbBackup from 'mongodb-backup';
import path from 'path';
import targz from 'targz';
import { exec } from 'child-process-promise';
import logger from '../api/utils/logger';
import config from '../api/config';
import { mkdirPSync } from '../api/utils/file';
import sThreeFilestore from '../api/third-party/aws-s3-filestore';

export default function backupDatabase() {
  return new Promise((resolve, reject) => {
    mkdirPSync('tmp');
    const fileName = _.last(config.mongo.uri.split('/'));
    const filePath = path.join('tmp', fileName);
    logger.info(_.template('Running database backup from <%= uri %> with file name: <%= fileName %>')({
      uri: config.mongo.uri,
      fileName
    }));

    function cleanup(cleanupPath) {
      return exec('rm -rf tmp').then(_.constant(cleanupPath));
    }

    mongodbBackup({
      uri: config.mongo.uri,
      root: 'tmp',
      callback(err) {
        if (err) {
          logger.error(
            _.template('Database backup for <%= date %> failed with: ')({ date: moment().format('YYYY-MM-DD') }) + err);
        } else {
          logger.info('Creating archive from database backup.');
          const tarGzFilePath = filePath + '.tar.gz';
          targz.compress({
            src: filePath,
            dest: tarGzFilePath
          }, (subErr) => {
            if (subErr) {
              logger.error('TarGZ compression failed with error: ' + subErr);
              reject(subErr);
            } else {
              const fileKey = _.template('<%= date %>-<%= environment %>.tar.gz')({
                date: moment().format('YYYY-MM-DD'),
                environment: process.env.NODE_ENV
              });
              logger.info('TarGZ compression succeeded.');
              logger.info(_.template('Pushing database backup from <%= uri %> with file key: <%= fileName %> to S3.')({
                uri: config.mongo.uri,
                fileName: fileKey
              }));
              sThreeFilestore.putDbBackup(fileKey, fs.createReadStream(tarGzFilePath))
                .then(cleanup)
                .then(resolve)
                .catch(reject);
            }
          });
        }
      }
    });
  });
}
