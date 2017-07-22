import _ from 'lodash';

export function markArrayChanges(model, propPath) {
  const ar = _.get(model, propPath);
  _.each(ar, (v, idx) => ar.set(idx, v));
  return model;
}

export function merge(doc, ...otherArgs) {
  _.each(otherArgs, (update) => {
    _.each(update, (v, k) => {
      _.set(doc, k, v);
    });
  });
  return doc;
}
