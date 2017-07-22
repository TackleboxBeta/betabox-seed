import _ from 'lodash';
import fs from 'fs-extra';
import path from 'path';
import moment from 'moment-timezone';
import { exec } from 'child-process-promise';
import streamBuffers from 'stream-buffers';

export function mkdirPSync(localPath, root) {
  root = root || '';
  localPath = _.isString(localPath) ? localPath.split('/') : localPath;
  const current = _.first(localPath);
  if (current) {
    if (!fs.existsSync(root + current)) {
      fs.mkdirSync(root + current);
    }
    mkdirPSync(_.tail(localPath), root + current + '/');
  }
}

export function localPathToPublic(localPath, host, prefix) {
  prefix = prefix || 'http';
  return _.template('<%= prefix %>://<%= host %>/<%= path %>')(
    { prefix, host, path: (localPath || '').replace(/(temp|\/temp|\.\/temp)\//g, '') }
  );
}

export function hardDelete(localPath, recursive) {
  recursive = !!recursive;
  return exec(_.template('rm <%= options %> <%= localPath %>')(
    { options: recursive ? '-rf' : '-f', localPath }
  ));
}

export function deleteDatedFiles(directoryPath, days) {
  return new Promise((resolve) => {
    _.chain(fs.readdirSync(directoryPath))
      .filter((fileName) => {
        const str = _.first(fileName.match(/^\d{8}/g));
        return !!str && moment(str, 'YYYYMMDD').isBefore(moment().subtract(days || 60, 'days'));
      })
      .each((fileName) => {
        fs.unlinkSync(path.join(directoryPath, fileName));
      })
      .value();
    resolve();
  });
}

export function addFilePathToBody(property) {
  return (req, res, next) => {
    _.set(req, ['body', property], _.get(req, 'file.path', ''));
    next();
  };
}

export function bufferToStream(fileBuffer) {
  const stream = new streamBuffers.ReadableStreamBuffer({
    frequency: 10,
    chunkSize: 2048
  });
  stream.put(fileBuffer);
  return stream;
}
