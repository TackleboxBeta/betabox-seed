const _ = require('lodash');
const fs = require('fs-extra');

exports.writeToEnvFile = (filename, key, value) => {
  if (!fs.existsSync(filename)) {
    fs.writeFileSync(filename, '');
  }
  const env = _.chain(fs.readFileSync(filename, 'utf-8').split('\n')).reduce((acc, row) => {
    const [k, v] = row.split('=');
    acc[k] = v;
    return acc;
  }, {}).omitBy(_.isNil).value();
  fs.writeFileSync(filename,
    _.reduce(_.merge({}, env, { [key]: value }), (acc, v, k) => acc.concat(`${k}=${v}`), []).join('\n'));
};

exports.retrieveValueFromFile = (filename, key) => _.trim(_.chain(fs.readFileSync(filename, 'utf-8').split('\n'))
  .find((val) => new RegExp('^' + key).test(val)).value().split('=')[1]);
