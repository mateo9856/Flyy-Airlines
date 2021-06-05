import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../AppContext";
import Users from "../models/Users";
import "../css/Login.css";
import { useHistory } from "react-router";

const Login = () => {
    const [context, setContext] = useContext(AppContext);
    const history = useHistory();
    const [datas, setDatas] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const findUser = Users.filter((user) => user.login === datas.email);
        const newDatas = {
            isLogged: true,
            userData: findUser[0],
            userRole: findUser[0].role,
        };

        if (findUser.length > 0) {
            setContext(newDatas);
            localStorage.setItem("loginData", JSON.stringify(newDatas));
            history.push("/");
        } else {
            return "niezalogowany";
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
            <h4 className="text-center">Zaloguj siê do Flyy!</h4>
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
