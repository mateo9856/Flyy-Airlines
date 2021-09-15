import React from "react";

import "../../css/Sidebar.css"
import { AdminContext } from "../Admin";

const types = [
    {
        state: "home",
        name: "Main"
    },
    {
        state: "flights",
        name: "Flights"
    },
    {
        state: "airplanes",
        name: "Airplanes"
    },
    {
        state: "reservations",
        name: "Reservations"
    },
    {
        state: "employees",
        name: "Employees"
    },
    {
        state: "users",
        name: "Users"
    },
    {
        state: "news",
        name: "News"
    }
]

export default function Sidebar() {
    return (
        <>     
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <ul className="sidebarList">
                        {types.map(val => <AdminContext.Consumer>
                            {(context) => (
                                <li onClick={() => context.change(val.state)}>{val.name}</li>
                                )}
                        </AdminContext.Consumer>)}
                    </ul>
                </div>
                </div>
            
        </>)
}