import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import Auth from '../Auth';
export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
        collapsed: true,
        logged: false,
    };
    }

    componentDidMount() {
        console.log(Auth.authenticated)
        this.setState({
            logged: Auth.authenticated
        })
    }

    componentDidUpdate() {
        console.log("NavMenu updated")
        if (this.state.logged != Auth.authenticated) {
            this.setState({
                logged: Auth.authenticated
            })
        }
    }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
  render () {
      return (
          <header className = "headerStyle">
              <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
          <Container>
            <NavbarBrand tag={Link} to="/">FlyyAirlines</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                </NavItem>
                <NavItem>
                <NavLink tag={Link} className="text-dark" to="/reservations">Reservations</NavLink>
                </NavItem>
                <NavItem>
                <NavLink tag={Link} className="text-dark" to="/flights">Flights</NavLink>
                </NavItem>
                <NavItem>
                <NavLink tag={Link} className="text-dark" to="/aboutus">About us</NavLink>
                              </NavItem>
                              {Auth.userRole === "Admin" ?
                                  <NavItem>
                                      <NavLink tag={Link} className="text-dark" to="/Admin">Admin</NavLink>
                                  </NavItem> : ""}
                {this.state.logged ? <NavItem>
                <NavLink tag={Link} className="text-dark" to="/logout">Log out</NavLink>
                 </NavItem> : <><NavItem>
                  <NavLink tag={Link} className="text-dark" to="/login">Login</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/register">Register</NavLink>
                </NavItem></>
                }
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
