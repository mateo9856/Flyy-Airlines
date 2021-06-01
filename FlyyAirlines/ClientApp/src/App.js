import React, { Component } from 'react';
import { Route } from 'react-router';
import { ProtectedRoute } from './ProtectedRoute';
import { Layout } from './components/Layout';
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
import Auth from './Auth';
import { Logout } from './components/Logout';
import AuthApi from "./AuthApi";

export default class App extends Component {
    static displayName = App.name;
    state = {
        logged: false
    }

    componentDidMount() {
        const isLogged = Auth.checkIsLogged();
        console.log(isLogged);
        if (isLogged) {
            this.setState({
                logged: true
            })
        }
        else {
            this.setState({
                logged: false
            })
        }
    }//jezeli callback nie zadziala to robimy context api
    componentDidUpdate() {
        console.log("Updated");
        if (this.state.logged != Auth.authenticated) {
            this.setState({
                logged: Auth.authenticated
            })
        }
    }

    handleLogin = login => {
        this.setState({
            logged: login
        })
    }

    handleLogout = logout => {
        this.setState({
            logged: logout,
        })
    }

    render() {
        return (
      <Layout>
            <Route exact path='/' component={Home} />
            <Route path='/aboutus' component={AboutUs} />
            <Route path='/reservations' component={Reservations} />
                <Route path='/flights' component={Flights} />
                <Route path='/login' component={() => <Log handleLogin={this.handleLogin} />} />
                <Route path='/register' component={Reg} />
                <Route path='/logout' component={() => <Logout handleLogout={this.handleLogout} />} />
            <Route path='RegisterSubmit' component={RegisterSubmit} />
            <ProtectedRoute path='/admin' component={Admin} />
       </Layout>
    );
  }
}
