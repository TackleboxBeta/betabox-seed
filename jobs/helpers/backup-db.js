if (process.env.NODE_ENV) {
  const logger = require('../api/utils/logger');

  logger.info('Running database backup.');
  require('../definitions/backup-database')().then((success) => {
    logger.info('Backup database finished with ' + (success || 'no errors.'));
  }).catch((err) => {
    logger.error('Backup database failed with ' + err);
  }).then(() => {
    process.exit();
  });
} else {
  console.log('You must specify the NODE_ENV environment variable (either development, staging, or production).');
}
