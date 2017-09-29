import React, { Component } from 'react';
import { reduxForm, Field, propTypes } from 'redux-form';
import tempPasswordForceChangeValidation from './tempPasswordForceChangeValidation';
import ValidationInput from '../ValidationInput/ValidationInput';

@reduxForm({
  form: 'tempPasswordForceChange',
  validate: tempPasswordForceChangeValidation
})
export default class TempPasswordForceChangeForm extends Component {
  static propTypes = {
    ...propTypes
  };

  render() {
    const { handleSubmit, error } = this.props;

    return (
      <form className="form-horizontal" onSubmit={handleSubmit}>
        <Field name="example" type="text" component={ValidationInput} label="Example" />
        {error && <p className="text-danger"><strong>{error}</strong></p>}
        <div className="row">
          <div className="col-xs-12">
            <button className="btn btn-success" type="submit">
              Example
            </button>
          </div>
        </div>
      </form>
    );
  }
}
