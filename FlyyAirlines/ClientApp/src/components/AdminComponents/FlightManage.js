import React, { useEffect, useState } from "react";
import Airplanes from "../../models/Airplanes";
import Flights from "../../models/Flights";
//zrobic formatowanie
const convertToDateTimeString = (val) => {
    const convertDate = val.split("-");
    const convertDayAndTime = convertDate[2].split("T");
    convertDate.pop();
    const buildStringDate =
        convertDayAndTime[0] +
        "." +
        convertDate[1] +
        "." +
        convertDate[0] +
        " " +
        convertDayAndTime[1] +
        ":00";
    return buildStringDate;
};

const FlightManage = (props) => {
    const [flightDatas, setFlightDatas] = useState({
        flightName: "",
        country: "",
        city: "",
        toCountry: "",
        toCity: "",
        departureDate: new Date(),
        airplane: Airplanes[0],
    });
    const [flightsList, setFlightsList] = useState([]);
    const [airplanesList, setAirplanesList] = useState([]);
    const [airplaneDatas, setAirplaneDatas] = useState({
        planeName: "",
        numberOfSeats: "",
    });

    useEffect(() => {
        if (props.selectedManage === "remove") {
            GetFlights();
        }
    }, []);

    const GetFlights = () => {
        setFlightsList(Flights);
    };

    const AddFlight = (e) => {
        e.preventDefault();
        Flights.push({
            id: Flights.length,
            flightName: flightDatas.flightName,
            from: {
                city: flightDatas.city,
                country: flightDatas.country,
            },
            to: {
                city: flightDatas.toCity,
                country: flightDatas.toCountry,
            },
            departureDate: flightDatas.departureDate,
            reservedPlaces: [],
            airplane: flightDatas.airplane,
        });
        alert("Dodano!");
    };

    const RemoveFlight = (e) => {
        e.preventDefault();
        Flights.splice(parseInt(e.target.name, 10), 1);
        setFlightsList({});
        alert("Element usunięto!");
        props.exit();
    };

    const AddAirplane = (e) => {
        e.preventDefault();
        Airplanes.push({
            id: Airplanes.length,
            planeName: airplaneDatas.planeName,
            numberOfSeats: airplaneDatas.numberOfSeats
        })
        alert("Dodano");
    };

    const handleChange = (e) => {
        if (e.target.name === "departureDate") {
            const buildStringDate = convertToDateTimeString(e.target.value);
            setFlightDatas({
                ...flightDatas,
                [e.target.name]: buildStringDate,
            });
        } else if (e.target.name === "airplane") {
            const findArray = Airplanes.filter(
                (val) => val.id === parseInt(e.target.value, 10)
            );
            setFlightDatas({
                ...flightDatas,
                [e.target.name]: findArray,
            });
        } else {
            setFlightDatas({
                ...flightDatas,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handleAirplaneChange = (e) => {
        setAirplaneDatas({
            ...airplaneDatas,
            [e.target.name]: e.target.value
        })
    };

    return (
        <>
            {props.selectedManage === "add" ? (
                <div>
                    <form onSubmit={AddFlight}>
                        <div className="form-group">
                            <label className="text-left text-capitalize">Nazwa lotu</label>
                            <input
                                className="form-control"
                                type="text"
                                onChange={handleChange}
                                value={flightDatas.flightName}
                                name="flightName"
                            />
                        </div>
                        <br />
                        <div className="form-group">
                            <label className="text-left text-capitalize">Państwo</label>
                            <input
                                className="form-control"
                                type="text"
                                onChange={handleChange}
                                value={flightDatas.country}
                                name="country"
                            />
                        </div>
                        <br />
                        <div className="form-group">
                            <label className="text-left text-capitalize">Miasto</label>
                            <input
                                className="form-control"
                                type="text"
                                onChange={handleChange}
                                value={flightDatas.city}
                                name="city"
                            />
                        </div>
                        <br />
                        <div className="form-group">
                            <label className="text-left text-capitalize">Państwo - cel</label>
                            <input
                                className="form-control"
                                type="text"
                                onChange={handleChange}
                                value={flightDatas.toCountry}
                                name="toCountry"
                            />
                        </div>
                        <br />
                        <div className="form-group">
                            <label className="text-left text-capitalize">Miasto - cel</label>
                            <input
                                className="form-control"
                                type="text"
                                onChange={handleChange}
                                value={flightDatas.toCity}
                                name="toCity"
                            />
                        </div>
                        <br />
                        <div className="form-group">
                            <label className="text-left text-capitalize">Samolot</label>
                            <select
                                name="airplane"
                                onChange={handleChange}
                                class="form-control"
                            >
                                {Airplanes.map((air) => (
                                    <option value={air.id}>{air.planeName}</option>
                                ))}
                            </select>
                        </div>
                        <br />
            Data wylotu
            <div className="form-group">
                            <input
                                className="form-control"
                                type="datetime-local"
                                name="departureDate"
                                onChange={handleChange}
                            />
                        </div>
                        <br />
                        <input className="btn btn-primary" type="submit" value="Dodaj" />
                    </form>
                </div>
            ) : (
                    ""
                )}
            {props.selectedManage === "remove" ? (
                <div>
                    <form>
                        <table className="table">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Nazwa lotu</th>
                                    <th scope="col">Akcja</th>
                                </tr>
                            </thead>
                            <tbody>
                                {flightsList.length > 0
                                    ? flightsList.map((list) => (
                                        <tr key={list.id}>
                                            <th scope="row">{list.id}</th>
                                            <td>{list.flightName}</td>
                                            <td>
                                                <button className="btn btn-outline-primary" name={list.id} onClick={RemoveFlight}>
                                                    Usuń
                          </button>
                                            </td>
                                        </tr>
                                    ))
                                    : ""}
                            </tbody>
                        </table>
                    </form>
                </div>
            ) : (
                    ""
                )}
            {props.selectedManage === "addPlane" ? (
                <div>
                    <form onSubmit={AddAirplane}>
                        Nazwa samolotu
            <input
                            className="form-control"
                            type="text"
                            onChange={handleAirplaneChange}
                            value={airplaneDatas.planeName}
                            name="planeName"
                        />
                        <br />
            Liczba siedzeń
            <input
                            className="form-control"
                            type="number"
                            onChange={handleAirplaneChange}
                            value={airplaneDatas.numberOfSeats}
                            name="numberOfSeats"
                        />
                        <br />
                        <input className="btn btn-primary" type="submit" value="Dodaj" />
                    </form>
                </div>
            ) : (
                    ""
                )}
        </>
    );
};

export default FlightManage;
