import React, { useEffect, useState } from 'react';
import FetchDatas from '../../FetchDatas';
import { MdExitToApp } from 'react-icons/md';
import { ReturnFrom } from './ReturnForm';
import "../../css/Admin.css";
export const UsersAdmin = function () {

    const [Users, setUsers] = useState([]);

    useEffect(() => {
        FetchDatas.Get('api/Users', setUsers);
    }, [])

    const Delete = (val) => {
        FetchDatas.Delete('api/account/DeleteUser/' + val);
    }
    const [selectedId, setSelectedId] = useState("");
    const [PutEnabled, setPutEnabled] = useState(false);
    const Edit = () => {
        setPutEnabled(true);
    }

    const handleChange = (e) => {
        setSelectedId(e.target.value);
    }

    return (
        <>
            {PutEnabled && <div className="postForm">
                <button className="buttExit" onClick={() => setPutEnabled(false)}><MdExitToApp /></button>
                <div className="form-group">
                    Użytkownik
                    <select className="form-control" name="selectedId" value={selectedId} onChange={handleChange}>
                    </select>
                </div>
                <ReturnFrom table="user" />
            </div>}
        <div className={PutEnabled && "blurStyle"}>
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