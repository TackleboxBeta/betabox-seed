import _ from 'lodash';
import AWS from 'aws-sdk';
import sThreeStreams from 's3-streams';
import uuid from 'uuid';
import awsConfig from 'aws-config';
import logger from '../utils/logger';
import config from '../config';

const urlTemplate = _.template('<%= bucket %>.s3.amazonaws.com/<%= key %>');
const client = new AWS.S3(awsConfig({
  accessKeyId: _.get(config, 'aws.accessKeyId'),
  secretAccessKey: _.get(config, 'aws.secretAccessKey'),
}));

/* client.createBucket({Bucket: BUCKET_NAME_HERE}, _.noop); */

function putFile(key, bucket, fileStream) {
  return new Promise((resolve, reject) => {
    const upload = sThreeStreams.WriteStream(client, {
      Bucket: bucket,
      Key: key
    });
    logger.info('Placing ' + key + ' in ' + bucket + ' with url ' + urlTemplate({ bucket: bucket, key: key }));
    upload.on('error', (err) => {
      logger.error('S3 put operation failed with: ' + err);
      reject(err);
    });
    upload.on('finish', _.partial(resolve, urlTemplate({ bucket: bucket, key: key })));
    fileStream.pipe(upload);
  });
}

function getFile(key, bucket, writeStream) {
  return new Promise((resolve, reject) => {
    const download = sThreeStreams.ReadStream(client, {
      Bucket: bucket,
      Key: key
    });
    logger.info('Retrieving ' + key + ' from ' + bucket + ' with url ' + urlTemplate({ bucket: bucket, key: key }));
    download.on('error', (err) => {
      logger.error('S3 get operation failed with: ' + err);
      reject(err);
    });
    download.on('end', _.ary(resolve, 0));
    download.pipe(writeStream);
  });
}

export default {
  /* METHODS HERE */
};
