import React from "react";

import "../../css/Admin.css";
//next time build chart
export default function AdminHome() {
    return (
        <div className="homeContainer">
            <div className="reservationChart">
                <h3>Rezerwacje</h3>
            </div>
            <div className="messages">
                <h3>Wiadomości</h3>
            </div>
        </div>
        )
}