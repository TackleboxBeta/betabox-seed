require('babel-polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  app: {
    title: 'Tacklebox Betashop',
    description: 'All the modern best practices in one example.',
    head: {
      titleTemplate: 'Tacklebox Betashop: %s',
      meta: [
        { name: 'description', content: 'Tacklebox Betashop Seed' },
        { charset: 'utf-8' },
        { property: 'og:site_name', content: 'Tacklebox Betashop Seed' },
        { property: 'og:image', content: 'https://react-redux.herokuapp.com/logo.jpg' },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:title', content: 'Tacklebox Betashop Seed' },
        { property: 'og:description', content: 'Tacklebox Betashop Seed.' },
        { property: 'og:card', content: 'summary' },
        { property: 'og:site', content: 'Tacklebox Betashop' },
        { property: 'og:creator', content: 'Tacklebox Betashop' },
        { property: 'og:image:width', content: '200' },
        { property: 'og:image:height', content: '200' }
      ]
    }
  }
}, environment);
