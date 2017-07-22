import feathersMongoose from 'feathers-mongoose';
import hooks from './hooks';
import Model from './model';

export default function userService() {
  const app = this;

  const options = {
    Model,
    paginate: {
      default: 5,
      max: 25
    }
  };

  app.use('/users', feathersMongoose(options));

  app.service('users').hooks(hooks);
}
