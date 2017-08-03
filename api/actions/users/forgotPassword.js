import User from '../../services/users/model';

export default function forgotPassword(req) {
  return new Promise((resolve) => {
    const { email } = req.body;
    // NOTE - Failures should not be visible to users for security purposes
    User.findOne({ email })
      .then((user) => {
        if (user) {
          user.forgotPassword().then(resolve);
        } else {
          resolve();
        }
      })
      .catch(() => resolve());
  });
}
