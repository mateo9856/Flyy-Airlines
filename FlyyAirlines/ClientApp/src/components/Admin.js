import React, { useState } from 'react'
import EmployeeManage from './AdminComponents/EmployeeManage';
import FlightManage from './AdminComponents/FlightManage';
import PutManage from './AdminComponents/PutManage';

const Admin = (props) => {
    const [activeManage, setActiveManage] = useState("");

    const resetValues = () => {
        setActiveManage("");
    }

    return (
        <>
            <h1 className="text-center">Admin panel</h1>
            <div className="col-sm-12">
                <ul style={{ listStyleType: "none" }} className="gridAdminBtn d-flex flex-wrap justify-content-around">
                    <li><button className="buttWidth btn btn-primary" onClick={() => setActiveManage("add")}>Dodaj wylot</button></li>
                    <li><button className="buttWidth btn btn-primary" onClick={() => setActiveManage("remove")}>Usuń wylot</button></li>
                    <li><button className="buttWidth btn btn-primary" onClick={() => setActiveManage("addPlane")}>Dodaj samolot</button></li>
                    <li><button className="buttWidth btn btn-primary" onClick={() => setActiveManage("addEmployee")}>Dodaj pracownika</button></li>
                    <li><button className="buttWidth btn btn-primary" onClick={() => setActiveManage("removeEmployee")}>Usuń pracownika</button></li>
                    <li><button className="buttWidth btn btn-primary" onClick={() => setActiveManage("editData")}>Edytuj Dane</button></li>
                </ul>
                <div className="text-center">
                    {activeManage === "add" ?
                        <FlightManage selectedManage={activeManage} exit={resetValues} /> : ""}
                    {activeManage === "remove" ?
                        <FlightManage selectedManage={activeManage} exit={resetValues} /> : ""}
                    {activeManage === "addEmployee" ?
                        <EmployeeManage selectedManage={activeManage} exit={resetValues} /> : ""}
                    {activeManage === "addPlane" ?
                        <FlightManage selectedManage={activeManage} exit={resetValues} /> : ""}
                    {activeManage === "removeEmployee" ?
                        <EmployeeManage selectedManage={activeManage} exit={resetValues} /> : ""}
                    {activeManage === "editData" ? <PutManage exit={resetValues} /> : ""}
                </div>
            </div>
        </>
    )
}

export default Admin;