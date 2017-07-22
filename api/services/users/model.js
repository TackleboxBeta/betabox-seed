import mongoose, { Schema } from 'mongoose';
import _ from 'lodash';
import moment from 'moment-timezone';
import crypto from 'crypto';

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
 * Virtuals
 */
// UserSchema
//   .virtual('password')
//   .set(function (password) {
//     this._password = password;
//     this.salt = this.makeSalt();
//     this.hashedPassword = this.encryptPassword(password);
//   })
//   .get(function () {
//     return this._password;
//   });
//
// // Public profile information
// UserSchema
//   .virtual('profile')
//   .get(function () {
//     return {
//       'name': this.name,
//       'role': this.role
//     };
//   });
//
// // Non-sensitive info we'll be putting in the token
// UserSchema
//   .virtual('token')
//   .get(function () {
//     return {
//       '_id': this._id,
//       'role': this.role
//     };
//   });

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
// // Validate empty password
// UserSchema
//   .path('hashedPassword')
//   .validate(function (hashedPassword) {
//     if (authTypes.indexOf(this.provider) !== -1) return true;
//     return hashedPassword.length;
//   }, 'Password cannot be blank');
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
 * Pre-save hook
 */
// UserSchema
//   .pre('save', function (next) {
//     if (!this.isNew) return next();
//
//     if (!validatePresenceOf(this.hashedPassword) && authTypes.indexOf(this.provider) === -1)
//       next(new Error('Invalid password'));
//     else
//       next();
//   });

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
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */
  authenticate(plainText) {
    return this.encryptPassword(plainText) === this.hashedPassword;
  },

  /**
   * Make salt
   *
   * @return {String}
   * @api public
   */
  makeSalt() {
    return crypto.randomBytes(16).toString('base64');
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */
  encryptPassword(password) {
    if (!password || !this.salt) return '';
    const salt = new Buffer(this.salt, 'base64');
    return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
  },

  /**
   * Forgot password
   *
   * @return {Promise}
   * @api public
   */
  forgotPassword() {
    const self = this;
    return new Promise(function (resolve, reject) {
      self.password = generateTempPassword();
      self.tempPassword = true;
      self.save(function (err, user) {
        if (err) {
          reject(err);
        } else {
          // mailer().from('danielle@givekindra.com').to(user.email).template('forgot-password').globalMergeVar('password', user.password).send(function (err, response) {
          //   if (err) {
          //     reject(err);
          //   } else {
          //     resolve(user);
          //   }
          // });
        }
      });
    });
  }
};

export default mongoose.model('User', UserSchema);