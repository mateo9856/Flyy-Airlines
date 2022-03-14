import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { AppContext } from './AppContext';
import auth from './Auth';
export const ProtectedRoute = ({ component: Component, ...rest }) => {
    const [context, setContext] = useContext(AppContext);
    return (
        <Route {...rest} render={props => {
            if (context.isLogged && context.userRole === "Admin" || context.userRole === "Employee") {
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