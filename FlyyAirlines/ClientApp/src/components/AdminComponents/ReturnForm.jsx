import { data } from "jquery";
import React, { useEffect, useState } from "react";
import FetchDatas from "../../FetchDatas";
import axios from "axios";

export const convertToDateTimeString = (val) => {
    return val.replace(/[-T:]/gm, " ").split(" ");
};

export const ReturnFrom = (props) => {
    const [tableType, setTableType] = useState("user");
    const [isEmployeeUser, setIsEmployeeUser] = useState(false);
    const [datas, setDatas] = useState({});
    const [Airplanes, setAirplanes] = useState([]);
    const [Flights, setFlights] = useState([]);
    const [Reservations, setReservations] = useState([]);
    useEffect(() => {
        switch (props.table) {
            case "user":
                setDatas({
                    email: "",
                    userName: "",
                    password: "",
                    name: "",
                    surname: ""
                })
                break;
            case "reservation":
                axios.get('api/Flights/GetFlights').then(res => {
                    setFlights(res.data.result);
                    setDatas({
                        name: "",
                        surname: "",
                        personIdentify: 0,
                        seat: 0,
                        flightId: res.data.result[0].id
                    })
                })
                break;
            case "employee":
                setDatas({
                    name: "",
                    surname: "",
                    workPosition: "",
                    isEmployeeUser: false,
                    userName: "",
                    email: "",
                    password: ""
                })
                break;
            case "flight":
                FetchDatas.GetAll('api/Flights/GetAirplanes', setAirplanes);
                setDatas({
                    airplane: "",
                    fromCountry: "",
                    fromCity: "",
                    toCountry: "",
                    toCity: "",
                    departureDate: ""
                })
                break;
            case "airplane":
                setDatas({
                    planeName: "",
                    numberOfseats: 0
                })
                break;
            default:
                break;
        }

    }, [props.table])

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(datas);
        switch (props.table) {
            case "user":
                axios.post("api/account/register",
                    {
                        email: datas.email,
                        userName: datas.userName,
                        password: datas.password,
                        name: datas.name,
                        surname: datas.surname
                    }).then(res => {
                        alert("Zarejestrowany");
                    }).catch(err => {
                        console.log(err);
                        alert("Błąd z zaptaniem!")
                    })
                break;
            case "reservation":
                console.log(datas);
                FetchDatas.Post('api/Reservation', {
                    name: datas.name,
                    surname: datas.surname,
                    personIdentify: datas.personIdentify,
                    seat: parseInt(datas.seat, 10),
                    flight: datas.flightId,
                    user: ""
                });
                break;
            case "flight":
                FetchDatas.Post('api/Flights', {
                    fromCity: datas.fromCity,
                    fromCountry: datas.fromCountry,
                    toCity: datas.toCity,
                    toCountry: datas.toCountry,
                    airplane: datas.airplane,
                    departureDate: datas.departureDate
                });
                break;
            case "airplane":
                FetchDatas.Post('api/Flights/Airplane', {
                    planeName: datas.planeName,
                    numberOfSeats: datas.numberOfseats
                });
                break;
            case "employee":
                if (isEmployeeUser) {
                    FetchDatas.Post('api/account/addEmployee', {
                        name: datas.name,
                        surname: datas.surname,
                        workPosition: datas.workPosition,
                        email: datas.email,
                        userName: datas.userName,
                        password: datas.password
                    })
                } else {
                    FetchDatas.Post('api/Employees', {
                        name: datas.name,
                        surname: datas.surname,
                        workPosition: datas.workPosition
                    })
                }
                break;
        }
        props.exit();
    }

    const handleChange = (e) => {

        if (e.target.name === "departureDate") {
            setDatas({
                [e.target.name]: convertToDateTimeString(e.target.value)
            })
        }
        else {
            setDatas({
                ...datas,
                [e.target.name]: e.target.value
            })
        }
    }

    const returnSeats = (val) => {
        const GetAirplane = Flights.filter(res => res.id === val);
        console.log(GetAirplane);
        const arr = [];
        try {
            for (let i = 1; i <= GetAirplane[0].airplane.numberOfSeats; i++) {
                arr.push(<option value={i}>{i}</option>);
            }
        }
        catch (error) {

        }
        return arr;
    }
    const ReturnForms = () => {
        switch (props.table) {
            case "user":
                return (
                    <>
                        <div className="form-group">
                            Email:
                            <input className="form-control" type="text" name="email" value={datas.email} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            Password:
                            <input className="form-control" type="password" name="password" value={datas.password} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            User name:
                            <input className="form-control" type="text" name="userName" value={datas.userName} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            Name:
                            <input className="form-control" type="text" name="name" value={datas.name} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            Surname:
                            <input className="form-control" type="text" name="surname" value={datas.surname} onChange={handleChange} />
                        </div>
                    </>
                );
            case "reservation":
                return (
                    <>
                    <div className="form-group">
                        Name:
                        <input className="form-control" type="text" name="name" value={datas.name} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                        Surname:
                        <input className="form-control" type="text" name="surname" value={datas.surname} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                        Person Identify:
                        <input className="form-control" type="number" name="personIdentify" value={datas.personIdentify} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            Flight:
                        <select className="form-control" type="number" name="flightId" value={datas.flightId} onChange={handleChange}>
                               {Flights.map(res => <option value={res.id}>{res.flightName}</option>)}
                        </select>
                        </div>
                        <div className="form-group">
                            Seat:
                        <select className="form-control" name="seat" value={datas.seat} onChange={handleChange}>
                                {returnSeats(datas.flightId)}
                        </select>
                        </div>
                    </>
                    );
            case "employee":
                return (
                    <>
                        <div className="form-group">
                            Name:
                            <input className="form-control" type="text" name="name" value={datas.name} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            Surname:
                            <input className="form-control" type="text" name="surname" value={datas.surname} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            Work Position:
                            <input className="form-control" type="text" name="workPosition" value={datas.workPosition} onChange={handleChange} />
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" onChange={() => setIsEmployeeUser(!isEmployeeUser)} name="isEmployeeUser" type="checkbox" checked={datas.isEmployeeUser} /> User Employee
                        </div>
                        {isEmployeeUser && <>
                            <div className="form-group">
                                Email:
                            <input className="form-control" type="text" name="email" value={datas.email} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                Username:
                            <input className="form-control" type="text" name="userName" value={datas.userName} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                Password:
                            <input className="form-control" type="text" name="password" value={datas.password} onChange={handleChange} />
                            </div>
                        </>}
                    </>)
            case "flight":
                return (
                    <>
                        <div className="form-group">
                            Wylot z:<br />
                        Miasto
                        <input value={datas.fromCity} className="form-control" type="text" name="fromCity" onChange={handleChange} />
                        Państwo
                        <input value={datas.fromCountry} className="form-control" type="text" name="fromCountry" onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            Wylot do:<br />
                        Miasto
                        <input value={datas.toCity} className="form-control" type="text" name="toCity" onChange={handleChange} />
                        Państwo
                        <input value={datas.toCountry} className="form-control" type="text" name="toCountry" onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            Samolot
                        <select value={datas.airplane} onChange={handleChange} name="airplane" className="form-control">
                                {Airplanes.map(res => <option value={res.id}>{res.planeName}</option>)}
                            </select>
                        </div>
                        <div className="form-group">
                            Data wylotu:
                        <input className="form-control" type="datetime-local" name="departureDate" onChange={handleChange} />
                        </div>
                    </>)
            case "airplane":
                return (
                    <>
                        <div className="form-group">
                            Plane name:
                            <input type="text" className="form-control" name="planeName" value={datas.planeName} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            Number of seats:
                            <input type="number" className="form-control" name="numberOfseats" value={datas.numberOfseats} onChange={handleChange} />
                        </div>
                    </>)
            default:
                break;
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                {ReturnForms()}
                <input className = "btn btn-outline-primary" type="submit" value="Wykonaj!" />
            </form>
        </>)
}