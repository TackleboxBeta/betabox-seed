import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class HeadingRow extends Component {
  static propTypes = {
    pad: PropTypes.number,
    children: PropTypes.object.isRequired
  };

  static defaultProps = {
    pad: 0
  };

  render() {
    const { pad, children } = this.props;
    const styles = require('./SectionContainer.scss');
    const padding = `${pad.toString()}px`;

    console.log('PADDING', padding);

    return (
      <section className={styles.sectionContainer} style={{ paddingTop: padding, paddingBottom: padding }}>
        { children }
      </section>
    );
  }
}
