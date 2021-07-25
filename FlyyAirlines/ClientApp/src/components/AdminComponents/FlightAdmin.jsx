import React, { useEffect, useState } from 'react';
import FetchDatas from '../../FetchDatas';
import "../../css/Admin.css";
import { MdExitToApp } from 'react-icons/md';
export const FlightAdmin = function () {

    const [Flights, setFlights] = useState([]);
    const [PutEnabled, setPutEnabled] = useState(false);

    useEffect(() => {
        FetchDatas.GetAll('api/Flights/GetFlights', setFlights);
    }, [])

    const Delete = (val) => {
        FetchDatas.Delete('api/Flights/Flight/' + val);
    }

    const Edit = () => {
        setPutEnabled(true)
    }

    return (
        <div className = {PutEnabled && "blurStyle"}>
        <table className = "table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Wylot</th>
                    <th scope="col">Data wylotu</th>
                    <th scope="col">Samolot</th>
                    <th scope="col">Akcja</th>
                </tr>
            </thead>
            <tbody>
                {Flights.map(res => <tr>
                    <td>{res.id}</td>
                    <td>{res.flightName}</td>
                    <td>{res.departureDate}</td>
                    <td>{res.airplane.planeName}</td>
                    <td>
                        <button onClick={Edit}>Edytuj</button>
                        <button onClick={() => Delete(res.id)}>Usuń</button>
                    </td>
                </tr>)}
            </tbody>
            </table>
            </div>
        )
}