import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../AppContext";
import FetchDatas from "../../FetchDatas";

const PutManage = (props) => {
    const [context, setContext] = useContext(AppContext);
    const [changedData, setChangedData] = useState("reservation");
    const [sendedData, setSendedData] = useState({});
    const [Reservations, setReservations] = useState([]);
    const [Flights, setFlights] = useState([]);
    const [Airplanes, setAirplanes] = useState([])
    const [PersonData, setPersonData] = useState({});

    useEffect(() => {
        FetchDatas.GetAll('api/Reservation', setReservations);
    }, [])
    useEffect(() => {
        switch (changedData) {
            case "reservation":
                FetchDatas.GetAll('api/Flights/GetFlights', setFlights);
                break;
            case "flight":
                FetchDatas.GetAll('api/Flights/GetAirplanes', setAirplanes)
                break;
            case "airplane":
                FetchDatas.GetAll('api/Flights/GetFlights', setFlights);
                break;
            default:
                break;
        }
    }, [changedData])

    const EditInForms = (e) => {
        switch (e.target.name) {

            case "seat": case "numberOfSeats":
                setSendedData({
                    ...sendedData,
                    [e.target.name]: parseInt(e.target.value, 10)
                })
                break;
            case "flight": case "fromCity": case "fromCountry": case "toCity":
            case "toCountry": case "airplane": case "airplaneName": case "planeNane": 
                setSendedData({
                    ...sendedData,
                    [e.target.name]: e.target.value
                })
                break;
            case "personId":
                const GetPerson = Reservations.filter(data => data.personIdentify === parseInt(e.target.value, 10));
                setPersonData({
                    name: GetPerson[0].name,
                    surname: GetPerson[0].surname
                })
                break;
            case "departureDate":
                break;
        }
    }
    const returnForms = (data) => {
        switch (data) {
            case "reservation":
                return (<>
                    <div className="form-group">
                        <select name="personId" onChange={EditInForms} className="form-control">
                            Identyfikator:
                            {Reservations.map(data => <option value={data.personIdentify}>{data.personIdentify}</option>)}
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
                        <input className="form-control" type="number" name="seat" value={sendedData.seat} onChange={EditInForms} />
                    </div>
                </>)
            case "flight":
                return (<>
                    <div className="form-group">
                        Wylot z:<br />
                        Miasto
                        <input value={sendedData.fromCity} className="form-control" type="text" name="fromCity" onChange={EditInForms} />
                        Państwo
                        <input value={sendedData.fromCountry} className="form-control" type="text" name="fromCountry" onChange={EditInForms} />
                    </div>
                    <div className="form-group">
                        Wylot do:<br />
                        Miasto
                        <input value={sendedData.toCity} className="form-control" type="text" name="toCity" onChange={EditInForms} />
                        Państwo
                        <input value={sendedData.toCountry} className="form-control" type="text" name="toCountry" onChange={EditInForms} />
                    </div>
                    <div className="form-group">
                        Samolot
                        <select value={sendedData.flight} onChange={EditInForms} name="airplane" className="form-control">
                            {Airplanes.map(data => <option value={data.id}>{data.planeName}</option>)}
                        </select>
                    </div>
                    <div className="form-group">
                        Data wylotu:
                        <input className="form-control" type="datetime-local"  name="departureDate" value="0" onChange={EditInForms} />
                    </div>
                </>)
            case "airplane":
                return (<>
                    <div className="form-group">
                        Samolot:
                        <select value={sendedData.name} name="airplaneName" onChange={EditInForms} className="form-control">
                            {Airplanes.map(data => <option value={data.planeName}>{data.planeName}</option>)}
                        </select>
                    </div>
                    <div className="form-group">
                        Nowa nazwa:
                        <input value={sendedData.planeName} type="text" name="planeName" onChange={EditInForms} className="form-control" />
                    </div>
                    <div className="form-group">
                        Ilość siedzeń:
                        <input value={sendedData.numberOfSeats} type="number" name="numberOfSeats" onChange={EditInForms} className="form-control" />
                    </div>
                </>)
            default:
                return <h4>Wybierz dane!</h4>
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleChange = (e) => {
        setChangedData(e.target.value);
        switch (e.target.value) {
            case "reservation":    
                setSendedData({
                    personId: 0,
                    flight: "",
                    seat: 0
                })
                break;
            case "flight":         
                setSendedData({
                    fromCity: "",
                    formCountry: "",
                    toCity: "",
                    toCountry: "",
                    departureDate: "",
                    airplane:""
                })
                break;
            case "airplane":
                setSendedData({
                    name: "",
                    planeName: "",
                    numberOfSeats:0
                })
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