import React, { useEffect, useState } from 'react';
import FetchDatas from '../../FetchDatas';

export const UsersAdmin = function () {

    const [Users, setUsers] = useState([]);

    useEffect(() => {
        FetchDatas.Get('api/Users', setUsers);
    }, [])

    const Delete = (val) => {
        FetchDatas.Delete('api/account/DeleteUser/' + val);
    }

    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nazwa użytkownika</th>
                    <th scope="col">Imię i nazwisko</th>
                    <th scope="col">Rola</th>
                    <th scope="col">E-mail</th>
                    <th scope="col">Akcja</th>
                </tr>
            </thead>
            <tbody>
                {Users.map(res => <tr>
                    <td>{res.id}</td>
                    <td>{res.userName}</td>
                    <td>{res.name + " " + res.surname}</td>
                    <td>{res.role}</td>
                    <td>{res.email}</td>
                    <td>
                        <button>Edytuj</button>
                        <button onClick={() => Delete(res.id)}>Usuń</button>
                    </td>
                </tr>)}
            </tbody>
        </table>
    )
}