import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux';
import AdminList from 'components/admin/AdminList/AdminList';
import * as adminActions from 'redux/modules/admin';

const USER_COLUMNS = [
  { name: 'Email', key: 'email' }
];

// @TODO, not sure why this is not working
// @asyncConnect([{
//   promise: ({ store: { dispatch } }) => {
//     console.log('ASYNC DISPATCHING');
//     dispatch(adminActions.loadUsers());
//   }
// }])
@connect(
  state => {
    return {
      users: state.admin.users
    };
  },
  { ...adminActions }
)
export default class UserAdmin extends Component {
  static propTypes = {
    loadUsers: PropTypes.func.isRequired,
    users: PropTypes.array
  };

  componentDidMount() {
    this.props.loadUsers();
  }

  render() {
    const { users } = this.props;
    return (
      <div className="row">
        <div className="col-xs-12">
          <AdminList
            columns={USER_COLUMNS}
            data={users} />
        </div>
      </div>
    );
  }
}
