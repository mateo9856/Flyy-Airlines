import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../AppContext";

import "../css/Login.css";
import { useHistory } from "react-router";
import FetchDatas from "../FetchDatas";

const Login = () => {
    const [context, setContext] = useContext(AppContext);
    const history = useHistory();
    const [datas, setDatas] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = FetchDatas.Post('api/account/login', datas);
        if (data) {//przerobic by w calym axiosie bo jest asynchroniczne i najpierw jest undefined
            console.log(data.data)
            const loginData = {
                isLogged: true,
                userData: data.data,
                userRole: data.data.userRole
            }
            setContext(loginData)
            localStorage.setItem("loginUser", JSON.stringify(loginData))
            history.push("/")
        }
    };

    const handleChange = (e) => {
        setDatas({
            ...datas,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div>
            <h4 className="text-center">Zaloguj si� do Flyy!</h4>
            <div className="form-box">
                <form className="registerLoginForm" onSubmit={handleSubmit}>
                    <label>
                        <input
                            type="text"
                            placeholder="E-mail"
                            className="input-field"
                            name="email"
                            value={datas.email}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        <input
                            type="text"
                            placeholder="Password"
                            className="input-field"
                            name="password"
                            value={datas.password}
                            onChange={handleChange}
                        />
                    </label>
                    <input
                        style={{ marginTop: "15px", color: "white" }}
                        type="submit"
                        className="submit-btn"
                        value="Zaloguj!"
                    />
                </form>
            </div>
        </div>
    );
};

export default Login;
