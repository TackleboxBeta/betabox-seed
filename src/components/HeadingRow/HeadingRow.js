import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

export default class HeadingRow extends Component {
  static propTypes = {
    children: PropTypes.array.isRequired
  }

  render() {
    const { children } = this.props;
    const styles = require('./HeadingRow.scss');

    return (
      <Row className={styles.headingRow}>
        <Col sm={12}>
          { children }
        </Col>
      </Row>
    );
  }
}
