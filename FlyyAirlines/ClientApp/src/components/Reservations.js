import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../AppContext";
import "../css/Reservations.css";
import FetchDatas from "../FetchDatas";
const ReservationComponent = () => {
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
                        val[0].reservations.some(res => res.seat === (i+1)) ? colors.free : colors.busy
                    }
                >
                    {i + 1}
                </button>
            );
        }
        return arr;
    };

    useEffect(() => {
        console.log(context);
        FetchDatas.GetAll('api/Flights/GetFlights', setFlights)
        FetchDatas.Get('api/Reservation/' + context.userData.id, setReservations);
    }, [])

    const [activeReservation, setActiveReservation] = useState(false);
    const [Flights, setFlights] = useState([]);
    const [Reservations, setReservations] = useState([]);
    const [reservationVal, setReservationVal] = useState({
        name: "",
        surname: "",
        personIdentify: 0,
        seat: 0,
        flight: 0
    });
    const [context, setContext] = useContext(AppContext);
    const activeUser = context.userData;
    const GetReserve = Reservations.filter((res) => {
        return res.userReservation === activeUser[0];
    });
    const NewReservation = () => {
        setActiveReservation(true);
    };

    const handleFlightChange = (e) => {
        console.log(e.target.value)
        const filterFlight = Flights.filter((value) => value.id === e.target.value);
        setReservationVal({
            ...reservationVal,
            flight: filterFlight,
        });
    };

    const handleChange = (e) => {
        setReservationVal({
            ...reservationVal,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const checkFreeFlight = reservationVal.flight[0];
        console.log(checkFreeFlight.id);
        const sendDatas = {
            name: reservationVal.name,
            surname: reservationVal.surname,
            personIdentify: reservationVal.personIdentify,
            seat: buttonValue,
            flight: checkFreeFlight.id,
            user: context.userData.id
        };
        console.log();
        if (checkFreeFlight.reservations.some(el => el.seat === buttonValue)) {
            alert("Miejsce zajęte");
        } else {
        FetchDatas.Post('api/Reservation', sendDatas)
            alert("Zarezerwowano");
            setButtonValue(0);
            setReservationVal({
                name: "",
                surname: "",
                personIdentify: 0,
                seat: 0,
                flight:0
                
            })
        }
    };
    
    return (
        <>
            {context.isLogged ? <h1>Moje rezerwacje</h1> : <h1>Zaloguj się!</h1>}
            {context.isLogged && (
                <div className="row">
                    <div className="col-sm">
                        <button
                            className="btn btn-outline-primary"
                            onClick={NewReservation}
                        >
                            Nowa rezerwacja
            </button>
                        <table className="table table-stripped">
                            <thead>
                                <tr>
                                    <th scope="col">Imię</th>
                                    <th scope="col">Nazwisko</th>
                                    <th scope="col">Identyfikator</th>
                                    <th scope="col">Nazwa lotu</th>
                                    <th scope="col">Miejsce</th>
                                </tr>
                            </thead>
                            <tbody>
                                {activeUser.length > 0
                                    ? GetReserve.map((res) => (
                                        <tr>
                                            <th scope="row">{res.surname}</th>
                                            <td>{res.name}</td>
                                            <td>{res.personIdentify}</td>
                                            <td>{res.flight.flightName}</td>
                                            <td>{res.seat}</td>
                                        </tr>
                                    ))
                                    : ""}
                            </tbody>
                        </table>
                    </div>
                    <div className="col-sm">
                        {activeReservation ? (
                            <div>
                                <form onSubmit={handleSubmit}>
                                    <button
                                        className="buttonExit"
                                        onClick={() => setActiveReservation(false)}
                                    >
                                        X
                  </button>
                                    <div className="from-gorup">
                                        <select
                                            value={reservationVal.flight.id}
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
                                            value={reservationVal.name}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="form-group">
                                        Nazwisko:
                    <input
                                            onChange={handleChange}
                                            type="text"
                                            name="surname"
                                            value={reservationVal.surname}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="form-group">
                                        Identyfikator:
                    <input
                                            onChange={handleChange}
                                            type="number"
                                            name="personIdentify"
                                            value={reservationVal.personIdentify}
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
                                {reservationVal.flight ? (
                                    <div className="reservationTable">
                                        {buttonRows(reservationVal.flight)}
                                    </div>
                                ) : (
                                        ""
                                    )}
                            </div>
                        ) : (
                                ""
                            )}
                    </div>
                </div>
            )}
        </>
    );
};

export default ReservationComponent;
