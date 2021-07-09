import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../AppContext";
import FetchDatas from "../../FetchDatas";

const PutManage = (props) => {

    useEffect(() => {
        FetchDatas.GetAll('api/Reservation', setEditData);
    }, [])

    const EditInForms = (e) => {
        switch (e.target.name) {
            case "flight":
                break;
            case "seat":
                break;
            case "reservation":
                const GetPerson = editData.filter(data => data.personIdentify === parseInt(e.target.value, 10));
                setPersonData({
                    name: GetPerson[0].name,
                    surname: GetPerson[0].surname
                })
                break;
            case "airplane":
                break;
        }
    }
    const [sendedData, setSendedData] = useState({});
    const [Reservations, setReservations] = useState([]);
    const [Flights, setFlights] = useState([]);
    const [Airplanes, setAirplanes] = useState([]) 
    const [PersonData, setPersonData] = useState({});
    const [editData, setEditData] = useState([]);
    const returnForms = (data) => {
        switch (data) {
            case "reservation":
                FetchDatas.GetAll('api/Flights/GetFlights', setFlights);
                setSendedData({
                    reservation: "",
                    flight: "",
                    seat: ""
                })
                return (<>
                    <div className="form-group">
                        <select name="reservation" onChange={EditInForms} className="form-control">
                            Identyfikator:
                            {editData.map(data => <option value={data.personIdentify}>{data.personIdentify}</option>)}
                        </select>
                        <p className="text-center">Toższamość: {PersonData.name} {PersonData.surname}</p>
                    </div>
                    <div className="form-group">
                        Wylot
                        <select onChange={EditInForms} name="flight" className="form-control">
                            {Flights.map(data => <option value={data.id}>{data.flightName}</option>)}
                        </select>
                    </div>
                    <div className="form-group">
                        Miejsce
                        <input className = "form-control" type="number" name="seat" value="0" onChange={EditInForms} />
                    </div>
                </>)
            case "flight":
                FetchDatas.GetAll('api/Flights/GetAirplanes', setAirplanes)
                return (<>
                </>)
            case "airplane":
                FetchDatas.GetAll('api/Flights/GetFlights', setFlights);
                return (<>
                    <div className="form-group">
                        <select name="airplane" onChange={EditInForms} className="form-control">
                            Samolot:
                            {editData.map(data => <option value={data.planeName}>{data.planeName}</option>)}
                        </select>
                    </div>
                    <div className="form-group">
                        <input type="text" name="planeName" onChange={EditInForms} className="form-control" />
                    </div>
                    <div className="form-group">
                        <input type="number" name="numberOfSeats" onChange={EditInForms} className="form-control" />
                    </div>
                </>)
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