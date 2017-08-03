import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import Helmet from 'react-helmet';
import ForgotPasswordForm from 'components/ForgotPasswordForm/ForgotPasswordForm';
import * as authActions from 'redux/modules/auth';
import * as notifActions from 'redux/modules/notifs';
import { MESSAGES } from '../../strings';

@connect(
  _.noop,
  { ...notifActions, ...authActions })
export default class Login extends Component {
  static propTypes = {
    forgotPassword: PropTypes.func.isRequired,
    notifSend: PropTypes.func.isRequired
  };

  static defaultProps = {
    user: null
  };

  static contextTypes = {
    router: PropTypes.object
  };

  forgotPassword = data => {
    this.props.forgotPassword(data).then(this.successForgotPassword);
  };

  successForgotPassword = data => {
    this.props.notifSend({
      message: MESSAGES.PASSWORD_RESET_EMAIL_SENT,
      kind: 'success',
      dismissAfter: 20000
    });
    return data;
  };

  render() {
    return (
      <div className="container">
        <Helmet title="Forgot Password" />
        <h1>Forgot Password</h1>
        <ForgotPasswordForm onSubmit={this.forgotPassword} />
      </div>
    );
  }
}
