import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import NavList from 'components/NavList/NavList';

export default class Footer extends Component {

  render() {
    const styles = require('./Footer.scss');
    const navItems = [
      {
        to: '/about',
        textLabel: 'About',
        target: '_self'
      },
      {
        to: '/terms',
        textLabel: 'Terms',
        target: '_self'
      }
    ];

    return (
      <footer className={styles.footer}>
        <Grid>
          <Row>
            <Col md={6}>
              <NavList navItems={navItems}></NavList>
            </Col>

            <Col md={6}>
              Footer column
            </Col>
          </Row>
        </Grid>
      </footer>
    );
  }
}
