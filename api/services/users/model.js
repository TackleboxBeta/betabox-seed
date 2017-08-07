import mongoose, { Schema } from 'mongoose';
import _ from 'lodash';
import moment from 'moment-timezone';
import mailer from '../../utils/mailer';
import { hashPassword } from '../../utils/crypto';

// @TODO, pieces in this model that are specific to KINDRA still need to be undone (https://trello.com/c/KZACnwMe/29-user-model-must-be-updated-to-remove-kindra-cruft-and-do-real-password-encyrption)
const UserSchema = new Schema({
  name: String,
  email: { type: String, lowercase: true },
  password: String,
  role: {
    type: String,
    default: 'user'
  },
  hashedPassword: String,
  provider: String,
  salt: String,
  facebook: {},
  google: {},
  github: {},
  tempPassword: { type: Boolean, default: false }
});

/**
 * Private Methods
 */
function generateTempPassword() {
  return _.shuffle(
    _.sample(['Ankara', 'Batik', 'Celestial', 'Flora', 'Henna', 'Linen', 'Petal', 'Starry', 'Tropical']).toUpperCase() +
    moment().format(_.shuffle(['HH', 'mm', 'ss']).join(''))
  ).join('');
}

/**
 * Methods
 */
UserSchema.methods = {
  /**
   * Forgot password
   *
   * @return {Promise}
   * @api public
   */
  forgotPassword() {
    return new Promise((resolve, reject) => {
      const generatedPassword = generateTempPassword();
      hashPassword(generatedPassword).then((hashedPassword) => {
        this.password = hashedPassword;
        this.tempPassword = true;
        this.save((err, user) => {
          if (err) {
            reject(err);
          } else {
            mailer()
              .from('danielle@givekindra.com')
              .to(user.email)
              .template('forgot-password')
              .globalMergeVar('password', user.password)
              .send((error) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(user);
                }
              });
          }
        });
      });
    });
  }
};

export default mongoose.model('User', UserSchema);
