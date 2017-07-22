import _ from 'lodash';

/**
 * Can take many arguments and returns the first one that is defined.
 * @param val, ... valZ
 * @returns {*}
 */
export function definedOr(...args) {
  if (_.isUndefined(args[0]) && args.length > 1) {
    return exports.definedOr.apply(this, _.tail(args));
  } else {
    return args[0];
  }
}

/**
 * Can take many arguments and returns the first one that is truthy (not undefined, null, 0, false, or '').
 * @param val, ... valZ
 * @returns {*}
 */
export function truthyOr(...args) {
  if (!args[0] && args.length > 1) {
    return truthyOr.apply(this, _.tail(args));
  } else {
    return args[0];
  }
}
