import React, { useEffect, useState } from "react";
import FetchDatas from "../../FetchDatas";

export const convertToDateTimeString = (val) => {
    return val.replace(/[-T:]/gm, " ").split(" ");
};

export const ReturnFrom = (props) => {

    const [tableType, setTableType] = useState("user");

    const [datas, setDatas] = useState({})
    const [Airplanes, setAirplanes] = useState([]);
    const [Flights, setFlights] = useState([]);
    const [Reservations, setReservations] = useState([]);
    useEffect(() => {
        if (props.table === "reservations") {
            FetchDatas.GetAll('api/Reservation', setReservations);
        } else if (props.table === "flights") {
            FetchDatas.GetAll('api/Flights/GetFlights', setFlights);
        } else if (props.table === "airplanes") {
            FetchDatas.GetAll('api/Flights/GetAirplanes', setAirplanes);
        }
    }, [])

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

    const ReturnForms = () => {
        switch (props.table) {
            case "user":
                setDatas({//move states to useEffect!
                    email: "",
                    userName: "",
                    password: "",
                    name: "",
                    surname: ""
                })
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
            case "reservations":
                setDatas({
                    name: "",
                    surname: "",
                    personIdentify: 0,
                    seat: 0,
                    flightId: ""
                })
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
                                {/**/ }
                        </select>
                        </div>
                        <div className="form-group">
                            Seat:
                        <select className="form-control" name="seat" value={datas.seat} onChange={handleChange}>
                           {/*Dokończyć tu!*/ }
                        </select>
                        </div>
                    </>
                    );
            case "employees":
                setDatas({
                    name: "",
                    surname: "",
                    workPosition: "",
                    isEmployeeUser: false,
                    userName: "",
                    email: "",
                    password: ""
                })

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
                            <input className="form-check-input" type="checkbox" value={datas.isEmployeeUser} /> User Employee
                        </div>
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
                    </>)
            case "flights":
                setDatas({
                    airplane: "",
                    fromCountry: "",
                    fromCity: "",
                    toCountry: "",
                    toCity: "",
                    departureDate: ""
                })
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
                                {/**/}
                            </select>
                        </div>
                        <div className="form-group">
                            Data wylotu:
                        <input value={datas.departureDate} className="form-control" type="datetime-local" name="departureDate" onChange={handleChange} />
                        </div>
                    </>)
            case "airplanes":
                setDatas({
                    planeName: "",
                    numberOfseats: 0
                })
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