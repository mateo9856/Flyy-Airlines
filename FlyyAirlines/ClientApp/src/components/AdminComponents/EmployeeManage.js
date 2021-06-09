import React, { useEffect, useState } from 'react';
import "../../css/Admin.css";
import FetchDatas from '../../FetchDatas';

const EmployeeManage = (props) => {
    const [employeeDatas, setEmployeeDatas] = useState({
        name: "",
        surname: "",
        workPosition: "",
        login: "",
        email: "",
        password: "",

    });

    const [employeesList, setEmployeesList] = useState({});
    const [employeeUser, setEmployeeUser] = useState(false);

    useEffect(() => {
        if (props.selectedManage === "removeEmployee") {
            GetEmployees();
        }
    }, [])

    const GetEmployees = () => {
        FetchDatas.Get('api/Employees', setEmployeesList);
    }

    const AddEmployee = (e) => {
        e.preventDefault();
        console.log(employeeDatas)
        if (employeeUser) {
            FetchDatas.Post("api/Employees", {
                name: employeeDatas.name,
                surname: employeeDatas.surname,
                workPosition: employeeDatas.workPosition,
                userName: employeeDatas.login,
                email: employeeDatas.email,
                password: employeeDatas.password
            })
        } else {
            FetchDatas.Post('api/Employees', {
                name: employeeDatas.name,
                surname: employeeDatas.surname,
                workPosition: employeeDatas.workPosition
            })
        }
    }
    const RemoveEmployee = (id) => {
        FetchDatas.Delete("api/Employees" + id);
    }

    const handleChange = (e) => {
        setEmployeeDatas({
            ...employeeDatas,
            [e.target.name]: e.target.value
        });
    }

    return (
        <>
            {props.selectedManage === "addEmployee" ?
                <div>
                    <form onSubmit={AddEmployee}>
                        <div className="form-check">
                            <input className="checkBoxAddEmployee" type="checkbox" checked={employeeUser} onChange={(e) => setEmployeeUser(e.target.checked)} />
                            <label>Employee User</label>
                        </div><br />
                        <div className="form-group">
                            Nazwisko
                        <input className="form-control" type="text" onChange={handleChange} value={employeeDatas.name} name="name" />
                        </div><br />
                        <div className="form-group">
                            Imię
                        <input className="form-control" type="text" onChange={handleChange} value={employeeDatas.surname} name="surname" />
                        </div><br />
                        <div className="form-group">
                            Stanowisko
                        <input className="form-control" type="text" onChange={handleChange} value={employeeDatas.workPosition} name="workPosition" />
                        </div><br />
                        {employeeUser ? <div>
                            <div className="form-group">
                                Email:
                            <input className="form-control" type="text" name="email" value={employeeDatas.email} onChange={handleChange} />
                            </div><br />
                            <div className="form-group">
                                Login:
                            <input className="form-control" type="text" name="login" value={employeeDatas.login} onChange={handleChange} />
                            </div><br />
                            <div className="form-group">
                                Hasło:
                            <input className="form-control" type="password" name="password" value={employeeDatas.password} onChange={handleChange} />
                            </div><br />
                        </div> : ""}
                        <input className="btn btn-primary" type="submit" value="Dodaj" />
                    </form>
                </div> : ""}
            {props.selectedManage === "removeEmployee" ?
                <div>
                    <form>
                        <table className="table">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Nazwisko</th>
                                    <th scope="col">Imię</th>
                                    <th scope="col">Stanowisko</th>
                                    <th scope="col">Akcja</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employeesList.length > 0 ?
                                    employeesList.map(list => (
                                        <tr>
                                            <th scope="row">{list.id}</th>
                                            <td>{list.name}</td>
                                            <td>{list.surname}</td>
                                            <td>{list.workPosition}</td>
                                            <td><button className="btn btn-outline-primary" name={list.employeeId} onClick={() => RemoveEmployee(list.id)}>Delete</button></td>
                                        </tr>
                                    ))
                                    : ""}
                            </tbody>
                        </table>

                    </form>
                </div>
                : ""}
        </>
    )
}
export default EmployeeManage;