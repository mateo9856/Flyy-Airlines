import React from "react";
import { Line } from 'react-chartjs-2';
import "../../css/Admin.css";

const data = {
    labels: ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec'],
    datasets: [
        {
            label: 'Rezerwacje w miesiącu',
            data: [12, 19, 3, 5, 2, 3],
            fill: false,
            backgroundColor: [
                'rgb(20, 30, 32)',
                'rgb(240, 30, 32)',
                'rgb(20, 250, 32)',
                'rgb(20, 30, 232)',
                'rgb(0, 252, 250)',
                'rgb(60, 60, 60)',
            ],
            borderColor: 'rgba(255, 99, 32, 0.2)',
        },
    ],
};

const options = {
    scales: {
        yAxes: [
            {
                ticks: {
                    beginAtZero: true,
                },
            },
        ],
    },
};

export default function AdminHome() {
    return (
        <div className="homeContainer">
            <div className="reservationChart">
                <Line data={data} options={options} />
            </div><br />
            <div className="messages">
                <h3>Wiadomości</h3>
            </div>
        </div>
        )
}