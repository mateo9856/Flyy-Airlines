import { Button } from "bootstrap";
import React, { useContext, useEffect, useState } from "react";
import { Line } from 'react-chartjs-2';
import { AppContext } from "../../AppContext";
import "../../css/Admin.css";
import FetchDatas from "../../FetchDatas";
import SendMessage from "./SendMessage";

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
//add messages
export default function AdminHome() {

    const [context, setContext] = useContext(AppContext);

    const [Messages, setMessages] = useState([]);

    const [ActiveMessage, setActiveMessage] = useState(false);

    useEffect(() => {
        FetchDatas.Get('api/Messages/' + context.userData.id, setMessages);
    }, [])

    const handleDelete = (e) => {

    }

    const openMessage = (e) => {

    }

    return (
        <div className="homeContainer">
            <div className="reservationChart">
                <Line data={data} options={options} />
            </div><br />
            <div className="messages">
                <h3>Wiadomości</h3>
                <button className="btn btn-primary" onClick={() => setActiveMessage(!ActiveMessage)}>{ActiveMessage ? "Wyjdź" : "Nowa wiadomość"}</button>
                {ActiveMessage ? <SendMessage author={context.userData.id} exit={setActiveMessage} /> : <>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">From:</th>
                                <th scope="col">Title</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Messages.map(res => (<tr>
                                <td>{res.author}</td>
                                <td><button className="btnReadMessage" value={res.id} onClick={openMessage}>{res.title}</button></td>
                                <td><button value={res.id} onClick={handleDelete}
                                    className="btn btn-outline-danger">Delete</button></td>
                            </tr>))}
                        </tbody>
                    </table>
                </>}

            </div>
        </div>
        )
}