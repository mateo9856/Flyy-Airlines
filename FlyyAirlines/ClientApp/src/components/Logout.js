import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Auth from '../Auth';
export const Logout = (props) => {
    const history = useHistory();

    useEffect(() => {
        Auth.logout();
        props.handleLogout(false);
        history.push('/');
    }, [])


    return (
        <>
            <h1>Logout succesfully</h1>
        </>
        )

}