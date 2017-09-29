import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

function th({ name }) {
  return (
    <th key={name}>{name}</th>
  );
}

function tr(onSelect, columns, data) {
  return (
    <tr
      key={data._id}
      onClick={_.partial(onSelect, data)}>{_.map(columns, (col) => (
      <td key={col.key || col.name}>{_.get(data, col.key || col.name)}</td>))}</tr>
  );
}

export default class AdminList extends Component {
  static propTypes = {
    columns: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string, key: PropTypes.string })),
    data: PropTypes.arrayOf(PropTypes.object),
    onSelectRow: PropTypes.func.isRequired
  };

  render() {
    const { onSelectRow, columns, data  } = this.props;
    return (
      <table className="table table-hover">
        <thead>{_.map(columns, th)}</thead>
        <tbody>
        {_.map(data, _.partial(tr, onSelectRow, columns))}
        </tbody>
      </table>
    );
  }
}
