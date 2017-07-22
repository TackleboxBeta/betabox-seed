import _ from 'lodash';

export function formatPhoneNumber(str) {
  str = str ? str.replace(/-|\(|\)|\.|\s/g, '') : '';
  if (str) {
    return [str.substr(0, 3), str.substr(3, 3), str.substr(6, 4)].join('-');
  } else {
    return str;
  }
}

/**
 * Takes a string input and properly escapes all the RegExp specific characters in order to make generic strings into a regex.
 * @param s
 * @returns {string}
 */
export function escapeForRegExp(s) {
  return _.isString(s) ? s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') : s;
}

/**
 * Takes in either a string with an object to have params appended, or a string for parsing
 * @param base
 * @param params
 * @returns {string}
 */
export function urlParams(base, params) {
  base = base || '';
  // Creator
  if (_.isObject(params)) {
    return base + '?' + _.reduce(params, (sum, v, k) => sum.concat(k + '=' + v), []).join('&');
  }
  else {
    // Parser
    return ((paramString) => {
      return _.reduce(paramString.split('&'), (sum, pair) => {
        const [k, v] = pair.split('=');
        sum[k] = v;
        return sum;
      }, {});
    })(_.last(base.split('?')) || '');
  }
}

/**
 * Determines an image extension from a provided url.
 * @param str
 */
export function urlImageExtension(str) {
  return _.isString(str) ? _.first(str.match(/\.jpg|\.jpeg|\.png/)) : undefined;
}
