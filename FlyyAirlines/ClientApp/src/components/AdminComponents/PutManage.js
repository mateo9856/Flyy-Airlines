﻿import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../AppContext";
import FetchDatas from "../../FetchDatas";

const PutManage = (props) => {

    useEffect(() => {
        FetchDatas.GetAll('api/Reservation', setEditData);
    }, [])

    const GetPersonName = (e) => {
        const GetPerson = editData.filter(data => data.personIdentify === parseInt(e.target.value, 10));//robic metode returnForms!
        setPersonData({
            name: GetPerson[0].name,
            surname: GetPerson[0].surname
        })
    }
    const [PersonData, setPersonData] = useState({});
    const [editData, setEditData] = useState([]);
    const returnForms = (data) => {
        switch (data) {
            case "reservation":
                return (<>
                    <div className="form-group">
                        <select onChange={GetPersonName} className="form-control">
                            Identyfikator:
                            {editData.map(data => <option value={data.personIdentify}>{data.personIdentify}</option>)}
                        </select>
                        <p className="text-center">Toższamość: {PersonData.name} {PersonData.surname}</p>
                    </div>
                    <div className="form-group">
                        Wylot
                        <input type="text" className="form-control" name="flight" />
                    </div>
                    <div className="form-group">
                        Miejsce
                        <input type="text" className="form-control" name="flight" />
                    </div>
                </>)
            case "flight":
                return <></>
            case "airplane":
                return <></>
            default:
                return <h4>Wybierz dane!</h4>
        }
    }
    console.log(editData);
    const [changedData, setChangedData] = useState("reservation");
    const [context, setContext] = useContext(AppContext);

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleChange = (e) => {
        setChangedData(e.target.value);
        switch (e.target.value) {
            case "reservation":
                FetchDatas.GetAll('api/Reservation', setEditData);
                break;
            case "flight":
                FetchDatas.GetAll('api/Flights/GetFlights', setEditData);
                break;
            case "airplane":
                FetchDatas.GetAll('api/Flights/GetAirplanes', setEditData);
                break;
            default:
                break;
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="SelectChangedData">Co edytujesz?</label>
                </div>
                <select value={changedData} onChange={handleChange} className="form-control">
                    <option value="reservation">Rezerwacja</option>
                    <option value="flight">Wyloty</option>
                    <option value="airplane">Samolot</option>
                </select>
                {returnForms(changedData)}
                <input className="btn btn-primary" type="submit" value="Zmień!" />
            </form>
        </div>
    )
}

export default PutManage;