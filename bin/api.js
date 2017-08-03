#!/usr/bin/env node

/* DEBUG environmental options come from
here https://github.com/erikras/react-redux-universal-hot-example/pull/1119/files */
if (process.env.NODE_ENV !== 'production' && !process.env.DEBUG) {
  if (!require('piping')({
      hook: true,
      ignore: /(\/\.|~$|\.json$)/i
    })) {
    return;
  }
}
require('../server.babel'); // babel registration (runtime transpilation for node)
require('../api/api');
