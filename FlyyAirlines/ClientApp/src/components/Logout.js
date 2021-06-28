import React, { useContext, useEffect } from "react";
import { AppContext } from "../AppContext";
import { useHistory } from "react-router-dom";

const Logout = () => {
    const [context, setContext] = useContext(AppContext);
    const history = useHistory();

    useEffect(() => {
        localStorage.removeItem('loginUser');
        setContext({
            isLogged: false,
            userData: {},
            userRole: ""
        })
        history.push("/");
    })

    return (
        <h1>Wylogowano!</h1>    
    )
}

export default Logout;