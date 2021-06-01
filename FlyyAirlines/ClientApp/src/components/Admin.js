import React, { useState } from 'react'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import EmployeeManage from './AdminComponents/EmployeeManage';
import FlightManage from './AdminComponents/FlightManage';

export const Admin = (props) => {
    const [activeManage, setActiveManage] = useState("");

    const resetValues = () => {
        setActiveManage("");
    }

    return (
        <>
        <h1>Admin</h1>
            <div>
                <h3>Quick Panel</h3>
                <ul style={{ listStyleType: "none" }} className = "manageCheckList">
                    <li><button onClick={() => setActiveManage("add")}>Dodaj wylot</button></li>
                    <li><button onClick={() => setActiveManage("remove")}>Usuń wylot</button></li>
                    <li><button onClick={() => setActiveManage("addPlane")}>Dodaj samolot</button></li>
                    <li><button onClick={() => setActiveManage("addEmployee")}>Dodaj pracownika</button></li>
                    <li><button onClick={() => setActiveManage("removeEmployee")}>Usuń pracownika</button></li>
                    <li><button onClick={() => setActiveManage("addFlightPlane")}>Dodaj samolot do wylotu</button></li>
                </ul>
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
                {activeManage === "addFlightPlane" ?
                    <FlightManage selectedManage={activeManage} exit={resetValues} /> : ""}
        </div>
        </>
        )
}