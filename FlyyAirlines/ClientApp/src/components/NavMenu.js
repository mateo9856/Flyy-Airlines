import React, { useContext, useState } from "react";
import {
    Collapse,
    Container,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    NavLink,
} from "reactstrap";
import { Link } from "react-router-dom";
import { AppContext } from "../AppContext";
import "../css/Home.css";

const NavMenu = () => {
    const [context, setContext] = useContext(AppContext);
    const [collapsed, setCollapsed] = useState(true);
    const toggleNavbar = () => setCollapsed(!collapsed);
    return (
        <header>
            <Navbar
                color="white"
                className="navbar-expand-md navbar-toggleable-md ng-white border-bottom box-shadow mb-3"
                light
            >
                <Container>
                    <NavbarBrand className="mr-auto" tag={Link} to="/">
                        FlyyAirlines
          </NavbarBrand>
                    <NavbarToggler onClick={toggleNavbar} className="mr-2" />
                    <Collapse
                        isOpen={!collapsed}
                        navbar
                        className="d-md-inline-flex flex-md-row-reverse"
                    >
                        <ul className="navbar-nav flex-grow">
                            <NavItem>
                                <NavLink tag={Link} className="text-dark linkStyle" to="/">
                                    Main Page
                </NavLink>
                            </NavItem>
                            {context.userRole === "User" &&
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark linkStyle" to="/reservations">
                                        Reservations
                </NavLink>
                                </NavItem>}
                            {context.userRole === "Employee" &&
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark linkStyle" to="/checkReservation">
                                        Check reservations
                </NavLink>
                                </NavItem>}
                            <NavItem>
                                <NavLink tag={Link} className="text-dark linkStyle" to="/flights">
                                    Flights
                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="text-dark linkStyle" to="/aboutus">
                                    About us
                </NavLink>
                            </NavItem>
                            {context.userRole === "Admin" ? (
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark linkStyle" to="/Admin">
                                        Admin
                  </NavLink>
                                </NavItem>
                            ) : (
                                    ""
                                )}
                            {context.isLogged ? (
                                <>
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark linkStyle" to="/messages">
                                            News
                                        </NavLink>
                                    </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark linkStyle" to="/logout">
                                        Logout
                  </NavLink>
                                </NavItem></>
                            ) : (
                                    <>
                                        <NavItem>
                                            <NavLink tag={Link} className="text-dark linkStyle" to="/login">
                                                Login
                    </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink tag={Link} className="text-dark linkStyle" to="/register">
                                                Sign In
                    </NavLink>
                                        </NavItem>
                                    </>
                                )}
                        </ul>
                    </Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default NavMenu;
