import React, { useEffect, useState } from "react";
import FetchDatas from "../FetchDatas";

const CheckReservation = () => {


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
    

    const [selectedOption, setSelectedOption] = useState("check");
    const [checkedClicked, setCheckedClicked] = useState(false);
    const [checkForm, setCheckForm] = useState("");
    const [Reservations, setReservations] = useState([]);
    const [Flights, setFlights] = useState([]);
    const [checkDatas, setCheckDatas] = useState({
        name: "",
        surname: "",
        personIdentity: 0,
        seatNumber: 0,
        flight: 0
    });

    useEffect(() => {
        FetchDatas.GetAll('api/Reservation', setReservations)
        FetchDatas.GetAll('api/Flights/GetFlights', setFlights);
    }, [])

    useEffect(() => {
        if (selectedOption === "add") {
            setCheckDatas({
                name: "",
                surname: "",
                personIdentity: 0,
                seatNumber: 0,
                flight: 0
            });
        } else if (selectedOption === "check") {
            setCheckDatas({
                name: "",
                surname: "",
                personIdentity: 0,
                flight: 0
            });
        }
    }, [selectedOption]);

    const handleCheckSubmit = (e) => {
        e.preventDefault();
        if (checkForm === null) {
            alert("Click check user datas!");
            return;
        }
        const { name, surname, personIdentify } = checkForm[0];
        if (checkDatas.name === name && checkDatas.surname === surname && parseInt(checkDatas.personIdentity, 10) === personIdentify) {
            alert("Success!")
        } else {
            alert("Invalid!")
        }
    }

    const handleCheckClick = (e) => {
        const GetValue = Reservations.filter((res) => res.id === e.target.name);
        setCheckForm(GetValue);
        setCheckedClicked(true);
    }

    const handleChange = (e) => {
        setCheckDatas({
            ...checkDatas,
            [e.target.name]: e.target.value,
        })
    }

    const handleFlightChange = (e) => {
        console.log(e.target.value)
        const filterFlight = Flights.filter((value) => value.id === e.target.value);
        setCheckDatas({
            ...checkDatas,
            flight: filterFlight,
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
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
                        {checkedClicked && (
                            <div>
                                <button className="buttonExit" onClick={() => setCheckedClicked(false)}>
                                    X
                                </button>
                                <form onSubmit={handleCheckSubmit}>
                                    <div className="form-group">
                                        Name:
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="name"
                                            value={checkDatas.name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        Surname:
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="surname"
                                            value={checkDatas.surname}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        Person Identity:
                                        <input
                                            className="form-control"
                                            type="number"
                                            name="personIdentity"
                                            value={checkDatas.personIdentity}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <br />
                                    <input
                                        className="btn btn-primary"
                                        type="submit"
                                        value="Sprawdź"
                                    />
                                </form>
                            </div>
                        )}
                    </div>   
                )}
                {selectedOption === "add" && (
                    <div>
                        <form onSubmit={handleSubmit}>
                            <button
                                className="buttonExit"
                                onClick={() => setCheckedClicked(false)}
                            >
                                X
                            </button>
                            <div className="from-gorup">
                                <select
                                    value={checkDatas.flight.id}
                                    onChange={handleFlightChange}
                                    multiple
                                    className="form-control"
                                >
                                    {Flights.map((fly) => (
                                        <option value={fly.id}>{fly.flightName}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                Imię:
                                <input
                                    onChange={handleChange}
                                    type="text"
                                    name="name"
                                    value={Reservations.name}
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group">
                                Nazwisko:
                                <input
                                    onChange={handleChange}
                                    type="text"
                                    name="surname"
                                    value={Reservations.surname}
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group">
                                Identyfikator:
                                <input
                                    onChange={handleChange}
                                    type="number"
                                    name="personIdentify"
                                    value={Reservations.personIdentify}
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="submit"
                                    style={{ marginTop: "5px" }}
                                    className="btn btn-primary"
                                    value="Zarezerwuj!"
                                />
                            </div>
                        </form>
                        {checkDatas.flight ? (//dokonczyc rezerwacje od strony employsa
                            <div className="reservationTable">
                                {buttonRows(checkDatas.flight)}
                            </div>
                        ) : ""}
                    </div>
                )}
            </div>
        </div>
        
    )
}

export default CheckReservation;