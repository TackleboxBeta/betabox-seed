import _ from 'lodash';

export function acceptNoArguments(...args) {
  return _.ary(_.partial.apply(_, args), 0);
}
