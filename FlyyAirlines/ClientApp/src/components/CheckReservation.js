import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../AppContext";
import FetchDatas from "../FetchDatas";

const CheckReservation = () => {

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

    const [context, setContext] = useContext(AppContext);
    const [selectedOption, setSelectedOption] = useState("check");
    const [checkedClicked, setCheckedClicked] = useState(false);
    const [checkForm, setCheckForm] = useState("");
    const [Reservations, setReservations] = useState([]);
    const [Flights, setFlights] = useState([]);
    const [checkDatas, setCheckDatas] = useState({
        name: "",
        surname: "",
        personIdentify: 0,
        seatNumber: 0,
        flight: 0
    });
    const [sendedPdf, setSendedPdf] = useState([]);
    const [checkedData, setCheckedData] = useState(false);

    useEffect(() => {
        FetchDatas.GetAll('api/Reservation', setReservations)
        FetchDatas.GetAll('api/Flights/GetFlights', setFlights);
    }, [])

    useEffect(() => {
        if (selectedOption === "add") {
            setCheckDatas({
                name: "",
                surname: "",
                personIdentify: 0,
                seatNumber: 0,
                flight: 0
            });
        } else if (selectedOption === "check") {
            setCheckDatas({
                name: "",
                surname: "",
                personIdentify: 0,
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
        if (checkDatas.name === name && checkDatas.surname === surname && parseInt(checkDatas.personIdentify, 10) === personIdentify) {
            alert("Success!")
        } else {
            alert("Invalid!")
        }
        axios.post('api/Reservation/CheckReserve', {
            name: name,
            surname: surname,
            personIdentify: parseInt(personIdentify, 10)
        }).then(res => {
            setCheckedData(res.data);
        }).catch(err => {
            console.error(err);
            setCheckedData(false);
        });
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
        const filterFlight = Flights.filter((value) => value.id === e.target.value);
        setCheckDatas({
            ...checkDatas,
            flight: filterFlight,
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const checkFreeFlight = checkDatas.flight[0];
        const sendDatas = {
            name: checkDatas.name,
            surname: checkDatas.surname,
            personIdentify: parseInt(checkDatas.personIdentify, 10),
            seat: buttonValue,
            flight: checkFreeFlight.id,
        };
        if (checkFreeFlight.reservations.some(el => el.seat === buttonValue)) {
            alert("Miejsce zajęte");
        } else {
            axios.post('api/Reservation', sendDatas)
                .then(res => {
                    setCheckedData({
                        reservation: res.data.id
                    });
                }).catch(err => setCheckedData(false));
            alert("Zarezerwowano");
            setButtonValue(0);
            setCheckDatas({
                name: "",
                surname: "",
                personIdentify: 0,
                seat: 0,
                flight: 0

            })
        }
    }
    console.log(checkedData);
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
                                {Reservations.map((res) => (
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
                                <button className="buttonExit" onClick={() => setSelectedOption("")}>
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
                                        Person Identify:
                                        <input
                                            className="form-control"
                                            type="number"
                                            name="personIdentify"
                                            value={checkDatas.personIdentify}
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
                                {checkedData && <a onClick={() => setCheckedData(false)} target='_blank'
                                    href={"api/Pdf/reservationId=" + checkedData.reservation + "&employeeId=" + context.userData.id}
                                    className="btn btn-outline-primary">Generuj PDF</a>}
                            </div>
                        )}
                    </div>   
                )}
                {selectedOption === "add" && (
                    <div>
                        <button
                            className="buttonExit"
                            onClick={() => setSelectedOption("")}>
                            X
                            </button>
                        <form onSubmit={handleSubmit}>
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
                        {checkedData && <a onClick={() => {
                            setCheckedData(false);
                            setSelectedOption("");
                        }} target='_blank'
                            href={"api/Pdf/reservationId=" + checkedData.reservation + "&employeeId=" + context.userData.id}
                            className="btn btn-outline-primary">Generuj PDF</a>}
                        {checkDatas.flight ? (
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