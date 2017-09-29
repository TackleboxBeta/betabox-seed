import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { asyncConnect } from 'redux-connect';
import autobind from 'autobind-decorator'
import { connect } from 'react-redux';
import AdminList from 'components/admin/AdminList/AdminList';
import * as adminActions from 'redux/modules/admin';
import AdminForm from 'components/admin/AdminForm/AdminForm';

const USER_COLUMNS = [
  { name: 'Email', key: 'email' },
  { name: 'Role', key: 'role' }
];

const USER_FORM_FIELDS = [
  { name: 'Email', key: 'email' },
  { name: 'Role', key: 'role' }
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
      ...state.admin
    };
  },
  { ...adminActions }
)
export default class UserAdmin extends Component {
  static propTypes = {
    loadUsers: PropTypes.func.isRequired,
    selectUser: PropTypes.func.isRequired,
    users: PropTypes.array,
    selectedUser: PropTypes.object
  };

  componentDidMount() {
    this.props.loadUsers();
  }

  @autobind
  handleUpdate(data) {
    console.log(data);
  }

  render() {
    const { users, selectUser, selectedUser } = this.props;
    return (
      <div className="row">
        <div className="col-md-8">
          <AdminList
            columns={USER_COLUMNS}
            data={users}
            onSelectRow={selectUser} />
        </div>
        <div className="col-md-4">
          <AdminForm
            fields={USER_FORM_FIELDS}
            onSubmit={this.handleUpdate}
            data={selectedUser} />
        </div>
      </div>
    );
  }
}
