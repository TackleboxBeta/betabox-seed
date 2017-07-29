import React from 'react';
import PropTypes from 'prop-types';

const ValidationInput = ({ input, label, type, meta: { touched, error } }) => (
  <div className={`form-group ${error && touched ? 'has-error' : ''}`}>
    <label htmlFor={input.name} className="col-sm-2">{label}</label>
    <div className="col-sm-10">
      <input {...input} type={type} className="form-control" />
      {error && touched && <span className="glyphicon glyphicon-remove form-control-feedback"></span>}
      {error && touched && <div className="text-danger"><strong>{error}</strong></div>}
    </div>
  </div>
);

ValidationInput.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired
};

export default ValidationInput;
