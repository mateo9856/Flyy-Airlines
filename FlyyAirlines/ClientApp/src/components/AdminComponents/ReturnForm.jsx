import { data } from "jquery";
import React, { useEffect, useState } from "react";
import FetchDatas from "../../FetchDatas";

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
                FetchDatas.GetAll('api/Flights/GetFlights', setFlights);
                setDatas({
                    name: "",
                    surname: "",
                    personIdentify: 0,
                    seat: 0,
                    flightId: ""
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
        console.log(val);//dopracowac by flightid bylo ladowane
        const GetAirplane = Flights.filter(res => res.id === val);
        console.log(GetAirplane);
        const arr = [];
        for (let i = 1; i <= 30; i++) {
            arr.push(<option value={i}>{i}</option>);
        }
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
                            <input type="text" className="form-control" name="planeName" value={datas.planeName} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <input type="number" className="form-control" name="numberOfSeats" value={datas.numberOfseats} onChange={handleChange} />
                        </div>
                    </>)
            default:
                break;
        }
    }

    return (
        <>
            {ReturnForms()}
        </>)
}