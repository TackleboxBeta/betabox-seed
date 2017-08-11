import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

function th({ name }) {
  return (
    <th>{name}</th>
  );
}

function tr(columns, data) {
  return (
    <tr>{_.map(columns, (col) => (<td>{_.get(data, col.key || col.name)}</td>))}</tr>
  );
}

export default class AdminList extends Component {
  static propTypes = {
    columns: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string, key: PropTypes.string })),
    data: PropTypes.arrayOf(PropTypes.object)
  };

  render() {
    const { columns, data } = this.props;
    return (
      <table className="table table-hover">
        <thead>{_.map(columns, th)}</thead>
        <tbody>{_.map(data, _.partial(tr, columns))}</tbody>
      </table>
    );
  }
}
