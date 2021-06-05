import React, { Component } from 'react';
import { Route } from 'react-router';
import { ProtectedRoute } from './ProtectedRoute';
import { Home } from './components/Home';
import { Log } from './components/Login';
import { Reg } from './components/Register';
import { AboutUs } from './components/AboutUs';
import { Reservations } from './components/Reservations';
import { Flights } from './components/Flights';
import { NotFound } from './components/NotFound';
import { Admin } from './components/Admin';
import './custom.css'
import RegisterSubmit from './components/RegisterSubmit';
import { Logout } from './components/Logout';

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
                        <Route path='/checkReservation' component={CheckReserve} />
                        <Route path='/flights' component={FlightComponent} />
                        <Route path='/login' component={Login} />
                        <Route path='/register' component={Register} />
                        <Route path='/logout' component={Logout} />
                        <ProtectedRoute path='/Admin' component={Admin} />
                    </Switch>
                </Container>
            </AppContext.Provider>
        </div>
    );
}

export default App;
