const _ = require('lodash');
const fs = require('fs-extra');

exports.writeToEnvFile = (filename, key, value) => {
  const env = _.chain(fs.readFileSync(filename, 'utf-8').split('\n')).reduce((acc, row) => {
    const { k, v } = row.split('=');
    acc[k] = v;
    return acc;
  }, {}).reject(_.isNil).value();
  fs.writeFileSync(filename, _.reduce(_.merge({}, env, { [key]: value }), (acc, v, k) => acc.concat(`${k}=${v}`), []).join('\n'));
};
