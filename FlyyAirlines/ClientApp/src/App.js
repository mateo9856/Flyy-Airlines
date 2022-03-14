import React, { Component, useState, useEffect, useContext } from 'react';
import { Container } from "reactstrap";
import "./components/FontAwesomeIcons";
import { AppContext } from "./AppContext";
import CheckDevice from './CheckDevice';
import Header from './components/Headers/Header';
import RouteSwitches from './RouteSwitches';

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
        userRole: "",
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

    window.addEventListener('resize', function () {
        CheckDevice.SetDeviceWidth();
    });

    return (
        <div>
            <AppContext.Provider value={[context, setContext]}>
                <Header />
                <Container>
                    <RouteSwitches />
                </Container>
            </AppContext.Provider>
        </div>
    );
}

export default App;
