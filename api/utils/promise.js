import _ from 'lodash';

export function sequence(ar) {
  const payload = [];
  return _.reduce(ar, (sumPromise, fn) => {
    return sumPromise.then(fn).then((res) => {
      payload.push(res);
      return res;
    });
  }, Promise.resolve()).then(() => {
    return payload;
  });
}

export function callEach(block) {
  return _.map(block, (fn) => fn());
}

export function batchedSequence(ar, batchSize) {
  let payload = [];
  return _.chain(ar).chunk(batchSize || 5).reduce((sumPromise, functionBlock) => {
    return sumPromise.then(() => {
      return Promise.all(callEach(functionBlock)).then((results) => {
        payload = payload.concat(results);
        return results;
      });
    });
  }, Promise.resolve()).value().then(() => payload);
}
