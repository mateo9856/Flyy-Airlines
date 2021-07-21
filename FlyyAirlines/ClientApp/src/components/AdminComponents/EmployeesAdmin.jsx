import React, { useEffect, useState } from 'react';
import FetchDatas from '../../FetchDatas';

export const EmployeesAdmin = function () {

    const [Employees, setEmployees] = useState([]);

    useEffect(() => {
        FetchDatas.GetAll('api/Employees', setEmployees);
    }, [])

    const Delete = (val) => {
        FetchDatas.Delete('api/Employees/' + val);
    }

    return (
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
                        <button>Edytuj</button>
                        <button onClick={() => Delete(res.id)}>Usuń</button>
                    </td>
                </tr>)}
            </tbody>
        </table>
    )
}