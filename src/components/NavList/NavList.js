import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class HeadingRow extends Component {
  static propTypes = {
    navItems: PropTypes.array.isRequired
  };

  render() {
    const { navItems } = this.props;
    const styles = require('./NavList.scss');
    const items = navItems.map((item) => (
      <li key={item.textLabel}>
        <a href={item.to}>{item.textLabel}</a>
      </li>
    ));

    return (
      <nav className={styles.navList}>
        <ul>
          { items }
        </ul>
      </nav>
    );
  }
}
