import React from 'react';
import Auth from './Auth';
const values = {
    isLogged = Auth.authenticated
}

const LogContext = React.createContext(values);
