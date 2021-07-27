import React, { useEffect, useState } from 'react';
import FetchDatas from '../../FetchDatas';
import { MdExitToApp } from 'react-icons/md';
import "../../css/Admin.css";
import { ReturnFrom } from './ReturnForm';
export const ReservationsAdmin = function () {

    const [Reservations, setReservations] = useState([]);

    useEffect(() => {
        FetchDatas.GetAll('api/Reservation/', setReservations);
    }, [])

    const Delete = (val) => {
        FetchDatas.Delete('api/Reservation/' + val);
    }
    const [selectedId, setSelectedId] = useState("");
    const [PutEnabled, setPutEnabled] = useState(false);
    const Edit = (e) => {
        setPutEnabled(true);
        setSelectedId(e.target.value);
    }

    const disableForm = () => {
        setPutEnabled(false);
    }

    return (
        <>
            {PutEnabled && <div className="postForm">
                <button className="buttExit" onClick={() => setPutEnabled(false)}><MdExitToApp /></button>
                <ReturnFrom table="reservation" put={selectedId} exit={disableForm} />
            </div>}
        <div className={PutEnabled && "blurStyle"}>
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
                        <button value={res.id} onClick={Edit}>Edytuj</button>
                        <button onClick={() => Delete(res.id)}>Usuń</button>
                    </td>
                </tr>)}
            </tbody>
            </table>
            </div>
            </>
    )
}