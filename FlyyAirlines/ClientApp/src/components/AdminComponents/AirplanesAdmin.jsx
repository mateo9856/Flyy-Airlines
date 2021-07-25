import React, { useEffect, useState } from 'react';
import FetchDatas from '../../FetchDatas';
import { MdExitToApp } from 'react-icons/md';
import "../../css/Admin.css";
import { ReturnFrom } from './ReturnForm';
export const AirplanesAdmin = function () {

    const [Airplanes, setAirplanes] = useState([]);
    useEffect(() => {
        FetchDatas.GetAll('api/Flights/GetFlights', setAirplanes);
    }, [])
    const [PutEnabled, setPutEnabled] = useState(false);
    const [selectedId, setSelectedId] = useState("");
    const Delete = (val) => {
        FetchDatas.Delete('api/Flights/Airplane/' + val);
    }

    const Edit = () => {
        setPutEnabled(true);//robic operacje put
    }

    const handleChange = (e) => {
        setSelectedId(e.target.value);
    }

    return (
                <>
            {PutEnabled && <div className="postForm">
                <button className="buttExit" onClick={() => setPutEnabled(false)}><MdExitToApp /></button>
                <div className="form-group">
                    Samolot:
                    <select className="form-control" name="selectedId" value={selectedId} onChange={handleChange}>
                    </select>
                </div>
                <ReturnFrom table="airplane" />
            </div>}
        <div className={PutEnabled && "blurStyle"}>
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
                        <button onClick={Edit}>Edytuj</button>
                        <button onClick={() => Delete(res.id)}>Usuń</button>
                    </td>
                </tr>)}
            </tbody>
            </table>
            </div>
            </>
    )
}