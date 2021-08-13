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
import RegisterSubmit from './components/RegisterSubmit';
import Logout from './components/Logout';
import CheckReservation from './components/CheckReservation';
import { BsFillChatFill } from "react-icons/bs";
import Chat from './components/Chat';

const CheckIsLocalStorage = () => {
    try {
        const GetData = JSON.parse(localStorage.getItem('loginUser'));
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

    const [chat, setChat] = useState(false);

    useEffect(() => {
        if (CheckIsLocalStorage()) {
            const GetData = JSON.parse(localStorage.getItem('loginUser'));
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
                <button onClick={() => setChat(!chat)} className="chatButton"><BsFillChatFill className="chatIcon" /></button>
                <Container>
                    {context.isLogged && chat ? <Chat author={context.userData.id} exit={setChat} /> : ""}
                    <div style={chat ? { filter:"blur(5px)" } : {}}>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path='/aboutus' component={AboutUs} />
                        <Route path='/reservations' component={ReservationComponent} />
                        <Route path='/flights' component={FlightComponent} />
                        <Route path='/login' component={Login} />
                        <Route path='/register' component={Register} />
                        <Route path='/logout' component={Logout} />
                        <Route path= '/checkReservation' component={CheckReservation} />
                        <Route path='/registerSubmit' component={RegisterSubmit} />
                        <ProtectedRoute path='/Admin' component={Admin} />
                        </Switch>
                    </div>
                    
                </Container>
            </AppContext.Provider>
        </div>
    );
}

export default App;
