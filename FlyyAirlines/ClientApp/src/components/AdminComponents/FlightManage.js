import React, { useEffect, useState } from "react";
import FetchDatas from "../../FetchDatas";

const convertToDateTimeString = (val) => {//próba zmiany na regexa!
    console.log(val)
    const convertDate = val.split("-");
    let convertDayAndTime = convertDate[2].split("T");
    const convertMinutes = convertDayAndTime[1].split(":");
    convertDayAndTime.pop();
    convertDayAndTime = convertDayAndTime.concat(convertMinutes);
    convertDate.pop();
    const buildStringDate = convertDate.concat(convertDayAndTime);
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
        airplane: "c2aecb63-e606-4d2b-a371-9c49cc34675b"
    });
    const [flightsList, setFlightsList] = useState([]);
    const [airplanesList, setAirplanesList] = useState([]);
    const [airplaneDatas, setAirplaneDatas] = useState({
        planeName: "",
        numberOfSeats: "",
    });

    const GetAirplanes = () => {
        FetchDatas.GetAll('api/Flights/GetAirplanes', setAirplanesList)
    }

    useEffect(() => {
        if (props.selectedManage === "add") {
            GetAirplanes();
        }
        else if (props.selectedManage === "remove") {
            GetFlights();
        }
    }, []);

    const GetFlights = () => {
        FetchDatas.GetAll('api/Flights/GetFlights', setFlightsList);
        FetchDatas.Get('api/Flights/GetAirplanes', setAirplanesList)
    };

    const AddFlight = (e) => {
        e.preventDefault();

        FetchDatas.Post('api/Flights', {
            flightName: flightDatas.flightName,
            fromCountry: flightDatas.country,
            fromCity: flightDatas.city,
            toCountry: flightDatas.toCountry,
            toCity: flightDatas.toCity,
            departureDate: flightDatas.departureDate,
            airplane: flightDatas.airplane
        })
        alert("Dodano!");
    };

    const RemoveFlight = (e) => {
        e.preventDefault();
        FetchDatas.Delete('api/Flights/' + e.target.name)
        setFlightsList({});
        alert("Element usunięto!");
        props.exit();
    };

    const AddAirplane = (e) => {
        e.preventDefault();
        FetchDatas.Post('api/Flights/Airplane', {
            planeName: airplaneDatas.planeName,
            numberOfSeats: airplaneDatas.numberOfSeats
        })
        alert("Dodano");
    };

    const handleChange = (e) => {
        console.log(e.target.value);
        if (e.target.name === "departureDate") {
            const buildStringDate = convertToDateTimeString(e.target.value);
            setFlightDatas({
                ...flightDatas,
                [e.target.name]: buildStringDate,
            });
        }  else {
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
    console.log(airplanesList);
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
                                value={flightDatas.fromCountry}
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
                                value={flightDatas.fromCity}
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
                                value={flightDatas.airplane}
                                name="airplane"
                                onChange={handleChange}
                                class="form-control"
                            >
                                {airplanesList.map((air) => (
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
                                    ? flightsList.map((list, index) => (
                                        <tr key={list.id}>
                                            <th scope="row">{index}</th>
                                            <td>{list.flightName}</td>
                                            <td>
                                                <button className="btn btn-outline-primary" name={list.flightsId} onClick={RemoveFlight}>
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
