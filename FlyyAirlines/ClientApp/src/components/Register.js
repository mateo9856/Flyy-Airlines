import React, { useState } from "react";
import { useHistory } from "react-router";
import "../css/Register.css";
import FetchDatas from "../FetchDatas";
import Users from "../models/Users";
const Register = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        userName: "",
        name: "",
        surname: "",
    });

    const history = useHistory();

    const checkObjValueIsNotEmpty = (obj) => {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return true;
        }
        return false;
    }

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        FetchDatas.Post("api/account/register", {
            email: data.email,
            userName: data.userName,
            password: data.password,
            name: data.name,
            surname: data.surname
        })

        if (checkObjValueIsNotEmpty(data)) {
            alert("Zarejestrowany! Mo¿esz siê zalogowaæ")
            history.push('/')
        } else {
            alert("U¿ytkownik niezarejestrowany!")
        }
    };

    return (
        <div>
            <h4 className="text-center">Podaj swoje dane by w celu rejestracji!</h4>
            <div className="form-box">
                <form className="registerLoginForm" onSubmit={handleSubmit}>
                    <label>
                        <input
                            className="input-field"
                            placeholder="E-mail"
                            type="text"
                            name="login"
                            value={data.email}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label>
                        <input
                            className="input-field"
                            placeholder="User name"
                            type="text"
                            name="userName"
                            value={data.userName}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label>
                        <input
                            className="input-field"
                            placeholder="Name"
                            type="text"
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        <input
                            className="input-field"
                            placeholder="Surname"
                            type="text"
                            name="surname"
                            value={data.surame}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label>
                        <input
                            className="input-field"
                            placeholder="Password"
                            type="text"
                            name="password"
                            value={data.password}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <br />

                    <input
                        style={{ marginTop: "15px", color: "white" }}
                        type="submit"
                        className="submit-btn"
                        value="Zarejestruj"
                    />
                </form>
            </div>
        </div>
    );
};

export default Register;
