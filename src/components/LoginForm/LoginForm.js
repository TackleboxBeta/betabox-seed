import React, { Component } from 'react';
import { reduxForm, Field, propTypes } from 'redux-form';
import loginValidation from './loginValidation';
import ValidationInput from '../ValidationInput/ValidationInput';

@reduxForm({
  form: 'login',
  validate: loginValidation
})
export default class LoginForm extends Component {
  static propTypes = {
    ...propTypes
  };

  render() {
    const { handleSubmit, error } = this.props;

    return (
      <form className="form-horizontal" onSubmit={handleSubmit}>
        <Field name="email" type="text" component={ValidationInput} label="Email" />
        <Field name="password" type="password" component={ValidationInput} label="Password" />
        {error && <p className="text-danger"><strong>{error}</strong></p>}
        <div className="row">
          <div className="col-xs-2">
            <button className="btn btn-success" type="submit">
              <i className="fa fa-sign-in" />{' '}Log In
            </button>
          </div>
          <div className="col-xs-10">
            <a className="btn btn-warning" href="/forgotpassword">
              Forgot Password
            </a>
          </div>
        </div>
      </form>
    );
  }
}
