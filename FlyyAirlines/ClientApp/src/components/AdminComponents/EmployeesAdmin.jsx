import React, { useEffect, useState } from 'react';
import FetchDatas from '../../FetchDatas';
import "../../css/Admin.css";
import { MdExitToApp } from 'react-icons/md';
import { ReturnFrom } from './ReturnForm';
export const EmployeesAdmin = function () {

    const [Employees, setEmployees] = useState([]);

    useEffect(() => {
        FetchDatas.GetAll('api/Employees', setEmployees);
    }, [])
    const [PutEnabled, setPutEnabled] = useState(false);
    const Delete = (val) => {
        FetchDatas.Delete('api/Employees/' + val);
    }
    const [selectedId, setSelectedId] = useState("");
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
                <ReturnFrom table="employee" put={selectedId} exit={disableForm} />
            </div>}
        <div className={PutEnabled && "blurStyle"}>
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Imię i nazwisko</th>
                    <th scope="col">Stanowisko</th>
                    <th scope="col">Akcja</th>
                </tr>
            </thead>
            <tbody>
                {Employees.map(res => <tr>
                    <td>{res.id}</td>
                    <td>{res.name + " " + res.surname}</td>
                    <td>{res.workPosition}</td>
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