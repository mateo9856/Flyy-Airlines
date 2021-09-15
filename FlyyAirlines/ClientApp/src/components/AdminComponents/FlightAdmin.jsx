import React, { useEffect, useState } from 'react';
import FetchDatas from '../../FetchDatas';
import "../../css/Admin.css";
import { ReturnFrom } from './ReturnForm';
import { MdExitToApp } from 'react-icons/md';
export const FlightAdmin = function () {

    const [Flights, setFlights] = useState([]);
    const [PutEnabled, setPutEnabled] = useState(false);
    const [selectedFlight, setSelectedFlight] = useState("");
    const [selectedId, setSelectedId] = useState("");

    useEffect(() => {
        FetchDatas.GetAll('api/Flights/GetFlights', setFlights);
    }, [])

    const Delete = (val) => {
        FetchDatas.Delete('api/Flights/Flight/' + val);
    }

    const disableForm = () => {
        setPutEnabled(false);
    }

    const Edit = (e) => {
        setPutEnabled(true);
        setSelectedId(e.target.value);
    }

    const handleChange = (e) => {
        setSelectedFlight(e.target.value);
    }

    return (
                <>
            {PutEnabled && <div className="postForm">
                <button className="buttExit" onClick={() => setPutEnabled(false)}><MdExitToApp /></button>
                <div className="form-group">
                    Wylot:
                        <select className="form-control" name="selectedId" value={selectedFlight} onChange={handleChange}>
                        {Flights.map(res => <option value={res.id}>{res.flightName}</option>)}
                        </select>
                </div>
                <ReturnFrom table="flight" put={selectedId} exit={disableForm} />
            </div>}
        <div className={PutEnabled && "blurStyle"}>
        <table className = "table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Departure</th>
                    <th scope="col">Departure date</th>
                    <th scope="col">Airplane</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {Flights.map(res => <tr>
                    <td>{res.id}</td>
                    <td>{res.flightName}</td>
                    <td>{res.departureDate}</td>
                    <td>{res.airplane.planeName}</td>
                    <td>
                        <button value={res.id} onClick={Edit}>Edit</button>
                        <button onClick={() => Delete(res.id)}>Delete</button>
                    </td>
                </tr>)}
            </tbody>
            </table>
            </div>
            </>
        )
}