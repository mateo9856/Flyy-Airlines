import React, { useEffect, useState } from "react";
import FetchDatas from "../../FetchDatas";


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
        setDatas({
            ...datas,
            [e.target.name]: e.target.value
        })
    }

    const ReturnForms = () => {
        switch (props.table) {
            case "user":
                setDatas({
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
                    seat: 0
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
                    user:[]
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
                        {/*User Register*/}
                    </>)
            case "flights":
                return (
                    <>
                    </>)
            case "airplanes":
                return (
                    <>
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