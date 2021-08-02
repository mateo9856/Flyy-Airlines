import React from "react";

import "../../css/Sidebar.css"
import { AdminContext } from "../Admin";

const types = [
    {
        state: "home",
        name: "Menu główne"
    },
    {
        state: "flights",
        name: "Wyloty"
    },
    {
        state: "airplanes",
        name: "Samoloty"
    },
    {
        state: "reservations",
        name: "Rezerwacje"
    },
    {
        state: "employees",
        name: "Pracownicy"
    },
    {
        state: "users",
        name: "Użytkownicy"
    },
    {
        state: "news",
        name: "Newsy"
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