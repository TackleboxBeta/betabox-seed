import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import TempPasswordForceChangeForm from 'components/TempPasswordForceChangeForm/TempPasswordForceChangeForm';

@connect(
  state => ({ user: state.auth.user }),
  {})
export default class TempPasswordForceChange extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired
  };

  changePassword = (data) => {

  };

  render() {
    return (
      <div className="container">
        <Helmet title="Change Your Password" />
        <h1>Change Your Password</h1>
        <TempPasswordForceChangeForm onSubmit={this.changePassword} />
      </div>
    );
  }
}
