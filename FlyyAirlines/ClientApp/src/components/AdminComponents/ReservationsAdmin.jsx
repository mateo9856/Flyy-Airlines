import React, { useEffect, useState } from 'react';
import FetchDatas from '../../FetchDatas';

export const ReservationsAdmin = function () {

    const [Reservations, setReservations] = useState([]);

    useEffect(() => {
        FetchDatas.GetAll('api/Reservation/', setReservations);
    }, [])
    console.log(Reservations);
    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Imię i nazwisko</th>
                    <th scope="col">Identyfikator</th>
                    <th scope="col">Miejsce</th>
                    <th scope="col">Wylot</th>
                    <th scope="col">Akcja</th>
                </tr>
            </thead>
            <tbody>
                {Reservations.map(res => <tr>
                    <td>{res.id}</td>
                    <td>{res.name + " " + res.surname}</td>
                    <td>{res.personIdentify}</td>
                    <td>{res.seat}</td>
                    <td>{res.flights.flightName}</td>
                    <td>
                        <button>Edytuj</button>
                        <button>Usuń</button>
                    </td>
                </tr>)}
            </tbody>
        </table>
    )
}