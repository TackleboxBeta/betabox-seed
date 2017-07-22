import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IndexLink } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import config from 'config';

export default class Header extends Component {
  static propTypes = {
    user: PropTypes.object,
    logout: PropTypes.func.isRequired
  };

  static defaultProps = {
    user: null
  };

  handleLogout = event => {
    event.preventDefault();
    this.props.logout();
  };

  render() {
    const { user } = this.props;
    const styles = require('./Header.scss');

    return (
      <header className={styles.header}>
        <Navbar fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <IndexLink to="/" activeClassName={styles.activeLink} onlyActiveOnIndex>
                <span className={styles.title}>{config.app.title}</span>
              </IndexLink>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>

          <Navbar.Collapse>
            <Nav navbar pullRight>
              {!user && <LinkContainer to="/login">
                <NavItem>Login</NavItem>
              </LinkContainer>}

              {!user && <LinkContainer to="/register">
                <NavItem>Create account</NavItem>
              </LinkContainer>}

              {user && <p className="navbar-text">
                Logged in as <strong>{ user.email }</strong>.
              </p>}

              {user && <LinkContainer to="/logout">
                <NavItem onClick={this.handleLogout}>Logout</NavItem>
              </LinkContainer>}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
    );
  }
}
