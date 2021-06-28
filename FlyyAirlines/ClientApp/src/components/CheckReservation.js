import React, { useEffect, useState } from "react";
import FetchDatas from "../FetchDatas";

const CheckReservation = () => {

    const CheckReserve = () => {

        const handleClick = (e) => {
            setButtonValue(parseInt(e.target.value, 10));
        };

        const [buttonValue, setButtonValue] = useState(0);
        const buttonRows = (val) => {

            const arr = [];
            const colors = {
                free: {
                    backgroundColor: "green",
                    width: "40px",
                },
                busy: {
                    backgroundColor: "red",
                    width: "40px",
                },
            };

            const handleClick = (e) => {
                setButtonValue(parseInt(e.target.value, 10));
            };

            const currentAirplane = val[0].airplane.numberOfSeats;
            console.log(val[0]);
            for (let i = 0; i < currentAirplane; i++) {
                arr.push(
                    <button
                        value={i + 1}
                        className={i + 1 === buttonValue ? "clickedButton" : ""}
                        onClick={handleClick}
                        style={
                            val[0].reservations.some(res => res.seat === (i + 1)) ? colors.free : colors.busy
                        }
                    >
                        {i + 1}
                    </button>
                );
            }
            return arr;
        };
    }

    const [selectedOption, setSelectedOption] = useState("check");
    const [checkedClicked, setCheckedClicked] = useState(false);
    const [checkForm, setCheckForm] = useState("");
    const [Reservations, setReservations] = useState([]);
    const [checkDatas, setCheckDatas] = useState({
        name: "",
        surname: "",
        personIdentity: 0,
        flight: 0
    });

    useEffect(() => {
        if (selectedOption === "check") {
            FetchDatas.GetAll('api/Reservation', setReservations)
        }
    })

    const handleCheckClick = (e) => {

    }

    return (
        <div className="row">
            <div className="col-sm">
                <div className="buttonsFlex">
                    <button className="btn btn-outline-primary" onClick={() => setSelectedOption("check")}>
                        Sprawdź rezerwacje
                    </button>
                    <button className="btn btn-outline-primary" onClick={() => setSelectedOption("add")}>
                        Dodaj rezerwacje
                    </button>
                </div>
            </div>
            <div className="col-sm">
                {selectedOption === "check" && (
                    <div>
                        <table className="table table-stripped">
                            <thead>
                                <tr>
                                    <th scope="col">Imię</th>
                                    <th scope="col">Nazwisko</th>
                                    <th scope="col">Identyfikator</th>
                                    <th scope="col">Nazwa lotu</th>
                                    <th scope="col">Miejsce</th>
                                    <th scope="col">Akcja</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Reservations.map((res) => (//UWAGA! W reservations dodac by nie dodawalo jezeli flights jest nullem
                                    <tr>
                                        <th scope="row">{res.surname}</th>
                                        <td>{res.name}</td>
                                        <td>{res.personIdentify}</td>
                                        <td>{res.flights.flightName}</td>
                                        <td>{res.seat}</td>
                                        <td>
                                            <button className="btn btn-outline-primary" name={res.id} onClick={handleCheckClick}>
                                                Sprawdź dane
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>   
                 )}
            </div>
        </div>    
    )
}

export default CheckReservation;