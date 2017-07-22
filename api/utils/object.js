import _ from 'lodash';

export function alwaysArray(val) {
  return _.isArray(val) ? val : [val];
}

export function splitOrArray(val, delimeter) {
  return _.isString(val) ? val.split(delimeter || ',') : val;
}

export function stringToBoolean(str) {
  str = String(str);
  return !(str === 'false' || str === '0' || str === 'null' || str === 'undefined');
}

export function definedPropertiesToBoolean(obj, properties) {
  return ((obj) => {
    _.each(properties, (p) => {
      if (!_.isNil(_.get(obj, p))) {
        _.set(obj, p, exports.stringToBoolean(_.get(obj, p)));
      }
    });
    return obj;
  })(_.cloneDeep(obj));
}
