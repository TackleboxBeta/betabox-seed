import mongoose, { Schema } from 'mongoose';
import _ from 'lodash';
import moment from 'moment-timezone';
import crypto from 'crypto';
import mailer from '../../utils/mailer';

const authTypes = ['github', 'twitter', 'facebook', 'google'];

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
 * Validations
 */

// Validate empty email
// UserSchema
//   .path('email')
//   .validate(function (email) {
//     if (authTypes.indexOf(this.provider) !== -1) return true;
//     return email.length;
//   }, 'Email cannot be blank');
//
//
// // Validate email is not taken
// UserSchema
//   .path('email')
//   .validate(function (value, respond) {
//     const self = this;
//     this.constructor.findOne({ email: value }, function (err, user) {
//       if (err) throw err;
//       if (user) {
//         if (self.id === user.id) return respond(true);
//         return respond(false);
//       }
//       respond(true);
//     });
//   }, 'The specified email address is already in use.');
//
// const validatePresenceOf = function (value) {
//   return value && value.length;
// };

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
      this.password = generateTempPassword();
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
  }
};

export default mongoose.model('User', UserSchema);
