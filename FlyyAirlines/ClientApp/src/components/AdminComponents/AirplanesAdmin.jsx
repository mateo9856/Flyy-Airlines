import React, { useEffect, useState } from 'react';
import FetchDatas from '../../FetchDatas';

export const AirplanesAdmin = function () {

    const [Airplanes, setAirplanes] = useState([]);
    useEffect(() => {
        FetchDatas.GetAll('api/Flights/GetFlights', setAirplanes);
    }, [])

    const Delete = (val) => {
        FetchDatas.Delete('api/Flights/Airplane/' + val);
    }

    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">SamolotMiejsca</th>
                    <th scope="col">Akcja</th>
                </tr>
            </thead>
            <tbody>
                {Airplanes.map(res => <tr>
                    <td>{res.id}</td>
                    <td>{res.planeName}</td>
                    <td>{res.numberOfSeats}</td>
                    <td>
                        <button>Edytuj</button>
                        <button onClick={() => Delete(res.id)}>Usuń</button>
                    </td>
                </tr>)}
            </tbody>
        </table>
    )
}