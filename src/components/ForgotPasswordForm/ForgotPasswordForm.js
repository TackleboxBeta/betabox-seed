import React, { Component } from 'react';
import { reduxForm, Field, propTypes } from 'redux-form';
import forgotPasswordValidation from './forgotPasswordValidation';
import ValidationInput from '../ValidationInput/ValidationInput';

@reduxForm({
  form: 'forgotPassword',
  validate: forgotPasswordValidation
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
        {error && <p className="text-danger"><strong>{error}</strong></p>}
        <div className="row">
          <div className="col-xs-12">
            <button className="btn btn-success" type="submit">
              Send Password Reset Email
            </button>
          </div>
        </div>
      </form>
    );
  }
}
