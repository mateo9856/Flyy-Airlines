import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import auth from './Auth';
export const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={props => {
            if (auth.isAuthenticated() && auth.userRole === "Admin") {
                return <Component {...props} />;
            } else {
                return <Redirect to={{
                    pathname: "/",
                    state: {
                        from: props.location
                    }
                }} />

            }
        }

        } />
    );
    }