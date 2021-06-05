import React, { Component, useState, useEffect, useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import Home from './components/Home';
import { Container } from "reactstrap";
import NavMenu from "./components/NavMenu";
import AboutUs from './components/AboutUs';
import ReservationComponent from "./components/Reservations";
import Admin from './components/Admin';
import Login from "./components/Login";
import Register from "./components/Register";
import FlightComponent from "./components/Flights";
import './custom.css'
import { AppContext } from "./AppContext";

const CheckIsLocalStorage = () => {
    try {
        const GetData = JSON.parse(localStorage.getItem('loginData'));
        if (Object.keys(GetData).length > 0) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
}

function App() {
    const [context, setContext] = useState({
        isLogged: false,
        userData: {},
        userRole: ""
    })

    useEffect(() => {
        if (CheckIsLocalStorage()) {
            const GetData = JSON.parse(localStorage.getItem('loginData'));
            setContext({
                isLogged: true,
                userData: GetData.userData,
                userRole: GetData.userRole
            })
        }
    }, [])
    return (
        <div>
            <AppContext.Provider value={[context, setContext]}>
                <NavMenu />
                <Container>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path='/aboutus' component={AboutUs} />
                        <Route path='/reservations' component={ReservationComponent} />
                        <Route path='/flights' component={FlightComponent} />
                        <Route path='/login' component={Login} />
                        <Route path='/register' component={Register} />
                        <ProtectedRoute path='/Admin' component={Admin} />
                    </Switch>
                </Container>
            </AppContext.Provider>
        </div>
    );
}

export default App;
