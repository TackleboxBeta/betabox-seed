import bcrypt from 'bcryptjs';
import Verifier from 'feathers-authentication-local';
import User from '../services/users/model';
import { ERRORS } from '../../src/strings';

// @TODO, eventually upgrade this to use one from config or one generated and saved in the user model
const DEFAULT_SALT = 8;

export function hashPassword(password) {
  return bcrypt.hash(password, DEFAULT_SALT);
}

export class PasswordVerifier extends Verifier {
  verify(req, username, password, done) {
    User.findOne({ email: username }).then((user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, res) => {
          if (err || !res) {
            done(ERRORS.PASSWORD_INVALID);
          } else {
            done(null, user);
          }
        });
      } else {
        done(ERRORS.USER_NOT_FOUND, null);
      }
    }).catch(() => {
      done(ERRORS.USER_NOT_FOUND, null);
    });
  }
}
