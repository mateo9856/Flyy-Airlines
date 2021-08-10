import React, { useContext, useState } from 'react'
import EmployeeManage from './AdminComponents/EmployeeManage';
import FlightManage from './AdminComponents/FlightManage';
import PutManage from './AdminComponents/PutManage';
import NewsManager from "./AdminComponents/NewsManager";
import { MdCreate, MdExitToApp } from 'react-icons/md';
import "../css/Admin.css";
import Sidebar from './AdminComponents/Sidebar';
import AdminHome from './AdminComponents/AdminHome';
import { FlightAdmin } from './AdminComponents/FlightAdmin';
import { AirplanesAdmin } from './AdminComponents/AirplanesAdmin';
import { ReservationsAdmin } from './AdminComponents/ReservationsAdmin';
import { EmployeesAdmin } from './AdminComponents/EmployeesAdmin';
import { UsersAdmin } from './AdminComponents/UsersAdmin';
import { ReturnFrom } from './AdminComponents/ReturnForm';
import Chat from './Chat';
import { AppContext } from '../AppContext';

export const AdminContext = React.createContext();

const Admin = (props) => {
    const [activeManage, setActiveManage] = useState("");

    const [PostActive, setPostActive] = useState(false);

    const [context, setContext] = useContext(AppContext);

    const [SelectedPost, setSelectedPost] = useState("user");

    const resetValues = () => {
        setPostActive(false);
    }

    const [active, setActive] = useState("home");

    const returnComponent = (comp) => {
        switch (comp) {
            case "home":
                return <AdminHome />
                break;
            case "flights":
                return <FlightAdmin />
                break;
            case "airplanes":
                return <AirplanesAdmin />
                break;
            case "reservations":
                return <ReservationsAdmin />
                break;
            case "employees":
                return <EmployeesAdmin />
                break;
            case "users":
                return <UsersAdmin />
                break;
            case "news":
                return <NewsManager />
            default:
                break;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleChange = (e) => {
        setSelectedPost(e.target.value);
    }

    return (
        <>
            <AdminContext.Provider value={
                {
                    values: {},
                    type: active,
                    change: (val) => setActive(val)
                }   
            }>
                {PostActive &&
                    <div className="postForm">
                        <button className="buttExit" onClick={() => setPostActive(false)}><MdExitToApp /></button>
                        <div className="form-group">
                            <select className="form-control" name="categorySelect" value={SelectedPost} onChange={handleChange}>
                                <option value="user">User</option>
                                <option value="employee">Employee</option>
                                <option value="reservation">Reservation</option>
                                <option value="flight">Flight</option>
                                <option value="airplane">Airplane</option>
                            </select>
                    </div>
                    <ReturnFrom table={SelectedPost} exit={resetValues} />
                    </div>}
                <div className={PostActive ? "adminBox blurStyle" : "adminBox"}>
                    <div className="sidebar">
                        <Sidebar />
                    </div>
                    <div className="col-sm-12 otherPanel">
                        <div className="createButton">
                            <button onClick={() => setPostActive(true)} className="btnCreate">CREATE <MdCreate style={{ fontSize: "30px" }} /></button>
                        </div>
                        {returnComponent(active)}
                {/*<ul style={{ listStyleType: "none" }} className="gridAdminBtn d-flex flex-wrap justify-content-around">*/}
                {/*    <li><button className="buttWidth btn btn-primary" onClick={() => setActiveManage("add")}>Dodaj wylot</button></li>*/}
                {/*    <li><button className="buttWidth btn btn-primary" onClick={() => setActiveManage("remove")}>Usuń wylot</button></li>*/}
                {/*    <li><button className="buttWidth btn btn-primary" onClick={() => setActiveManage("addPlane")}>Dodaj samolot</button></li>*/}
                {/*    <li><button className="buttWidth btn btn-primary" onClick={() => setActiveManage("addEmployee")}>Dodaj pracownika</button></li>*/}
                {/*    <li><button className="buttWidth btn btn-primary" onClick={() => setActiveManage("removeEmployee")}>Usuń pracownika</button></li>*/}
                {/*    <li><button className="buttWidth btn btn-primary" onClick={() => setActiveManage("editData")}>Edytuj Dane</button></li>*/}
                {/*</ul>*/}
                {/*<div className="text-center">*/}
                {/*    {activeManage === "add" ?*/}
                {/*        <FlightManage selectedManage={activeManage} exit={resetValues} /> : ""}*/}
                {/*    {activeManage === "remove" ?*/}
                {/*        <FlightManage selectedManage={activeManage} exit={resetValues} /> : ""}*/}
                {/*    {activeManage === "addEmployee" ?*/}
                {/*        <EmployeeManage selectedManage={activeManage} exit={resetValues} /> : ""}*/}
                {/*    {activeManage === "addPlane" ?*/}
                {/*        <FlightManage selectedManage={activeManage} exit={resetValues} /> : ""}*/}
                {/*    {activeManage === "removeEmployee" ?*/}
                {/*        <EmployeeManage selectedManage={activeManage} exit={resetValues} /> : ""}*/}
                {/*    {activeManage === "editData" ? <PutManage exit={resetValues} /> : ""}*/}
                {/*</div>*/}
                </div>
                </div>
            </AdminContext.Provider>
        </>
    )
}

export default Admin;