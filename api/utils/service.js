import _ from 'lodash';
import logger from './logger';

export function reqHost(req) {
  if (!_.isEmpty(req)) {
    return req.protocol + '://' + req.get('host');
  } else {
    return '';
  }
}

export function reqUrl(req) {
  const rHost = reqHost(req);
  if (rHost) {
    return rHost + req.originalUrl;
  } else {
    return '';
  }
}

export function formFieldsParse(...args) {
  return function (req, res, next) {
    req.body = _.reduce(req.body, (sum, v, k) => {
      // Index checks make sure ids do not get accidentally parsed
      if (_.includes(args, k) && /{.*}|\[.*\]/.test(v)) {
        sum[k] = JSON.parse(v);
      } else {
        sum[k] = v;
      }
      return sum;
    }, {});
    next();
  };
}

export function requestProcessError(signature) {
  return function (err) {
    logger.error(signature + ': ' + _.isObject(err) ? JSON.stringify(err) : err);
  };
}
