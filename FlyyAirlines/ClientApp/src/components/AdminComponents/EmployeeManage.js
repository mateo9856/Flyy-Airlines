import React, { useEffect, useState } from 'react';
import FetchDatas from "../../FetchDatas"
const EmployeeManage = (props) => {
    const [employeeDatas, setEmployeeDatas] = useState({
        name: "",
        surname: "",
        workPosition: "",
    });
    const [employeeUserData, setEmployeeUserData] = useState({
        email: "",
        userName: "",
        password: ""
    })

    const [employeesList, setEmployeesList] = useState({});
    const [employeeUser, setEmployeeUser] = useState(false);

    useEffect(() => {
        if (props.selectedManage === "removeEmployee") {
            GetEmployees();
        }
    }, [])

    const GetEmployees = () => {
        FetchDatas.GetLists('api/Employees', setEmployeesList);
    }

    const AddEmployee = (e) => {
        e.preventDefault();
        if (employeeUser) {
            const sendedValue = { ...employeeDatas, ...employeeUserData };
            fetch('api/Account/addEmployee', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(sendedValue)
            })
                .then(response => response.json())
                .then(() => {
                    alert("Umysłowy dodany");
                    props.exit();
                })
                .catch(error => console.error('Unable to add item.', error));
            return;
        }
        

        fetch('api/Employees', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(employeeDatas)
        })
            .then(response => response.json())
            .then(() => {
                alert("Element added");
                props.exit();
            })
            .catch(error => console.error('Unable to add item.', error));
    }
    const RemoveEmployee = (e) => {
        e.preventDefault();
        console.log(e.target.name);
        FetchDatas.delete("api/Employees/" + e.target.name);
        alert("Element deleted")
        props.exit();
    }

    const SubmitRemoveEmployees = (e) => {
        e.preventDefault();
    }

    const handleChange = (e) => {
        setEmployeeDatas({//przetestowac to pozniej i dodac rowniez pracownikow do users inna metoda
            ...employeeDatas,
            [e.target.name]: e.target.value
        });
    }

    const handleEmployeeChange = (e) => {
        setEmployeeUserData({
            ...employeeUserData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <>
            {props.selectedManage === "addEmployee" ?
                <div>
                    <form onSubmit={AddEmployee}>
                        <input type="checkbox" checked={employeeUser} onChange={(e) => setEmployeeUser(e.target.checked)} />Employee User
                        Employee name
                    <input type="text" onChange={handleChange} value={employeeDatas.name} name="name" />
                        Surname
                        <input type="text" onChange={handleChange} value={employeeDatas.surname} name="surname" />
                        Work Position
                        <input type="text" onChange={handleChange} value={employeeDatas.workPosition} name="workPosition" />
                        {employeeUser ? <label>
                            Email:
                            <input type="text" name="email" value={employeeUserData.email} onChange={handleEmployeeChange} />
                            Login:
                            <input type="text" name="userName" value={employeeUserData.userName} onChange={handleEmployeeChange} />
                            Hasło:
                            <input type="password" name="password" value={employeeUserData.password} onChange={handleEmployeeChange} />
                        </label> : ""}
                        <input type="submit" value="Dodaj" />
                    </form>
                </div> : ""}
            {props.selectedManage === "removeEmployee" ?
                <div>
                    <form onSubmit={SubmitRemoveEmployees}>
                        <table className="table">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Surname</th>
                                    <th scope="col">Work Position</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employeesList.length > 0 ?
                                    employeesList.map(list => (
                                        <tr>
                                            <th scope="row">{list.employeeId}</th>
                                            <td>{list.name}</td>
                                            <td>{list.surname}</td>
                                            <td>{list.workPosition}</td>
                                            <td><button name={list.employeeId} onClick={RemoveEmployee}>Delete</button></td>
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