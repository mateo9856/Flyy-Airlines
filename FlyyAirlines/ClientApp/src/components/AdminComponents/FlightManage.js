import React, {useEffect, useState} from 'react';
import DatePicker from 'react-datepicker';
import FetchDatas from '../../FetchDatas';
const FlightManage = (props) => {

    const [flightDatas, setFlightDatas] = useState({
        flightName: "",
        country: "",
        city: "",
        departureDate: new Date()
    });
    const [flightsList, setFlightsList] = useState([]);
    const [airplanesList, setAirplanesList] = useState([]);
    const [airplaneDatas, setAirplaneDatas] = useState({
        planeName: "",
        date: new Date(),
        numberOfSeats: 0
    });


    useEffect(() => {
        if (props.selectedManage === "remove") {
            GetFlights();
        } else if (props.selectedManage === "addFlightPlane") {
            //implementacja airplanes i formularz select dobierający samolot do wylotu i fetch na airplaneflight(mozliwa nowa metoda do api)
            GetAirplanes();
            GetFlights();
            setAirplaneDatas("3");
            setFlightDatas("6");
        }
    }, [])

    const GetFlights = () => {
        FetchDatas.GetLists('api/Flights/GetFlights', setFlightsList)
        console.log(flightsList);
    }

    const GetAirplanes = () => {
        FetchDatas.GetLists('api/Flights/GetAirplanes', setAirplanesList)
        console.log(airplanesList);
    }

    const AddFlight = (e) => {//działa dopracować godzine i zrobic usuwanie jeszcze dzis
        e.preventDefault();
        fetch('api/Flights', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(flightDatas)
        })
            .then(response => response.json())
            .then(() => {
                alert("Element added");
                props.exit();
            })
            .catch(error => console.error('Unable to add item.', error));
    }

    const RemoveFlight = (e) => {
        e.preventDefault();
        console.log(e.target.name);
        FetchDatas.delete("api/Flights/" + e.target.name);
        alert("Element deleted")
        props.exit();
        
    }

    const SubmitRemoveFlight = () => {
        //po zaimplementowaniu checkboxów
    }

    const AddAirplane = (e) => {
        e.preventDefault();
        fetch('api/Flights/Airplane', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(airplaneDatas)
        })
            .then(response => response.json())
            .then(() => {
                alert("Element added");
                props.exit();
            })
            .catch(error => console.error('Unable to add item.', error));
    }

    const handleChange = (e) => {
        setFlightDatas({
            ...flightDatas,
            [e.target.name]: e.target.value
        });
    }

    const handleAirplaneChange = (e) => {
        setAirplaneDatas({
            ...airplaneDatas,
            [e.target.name]: e.target.value
        })
    }

    const AirplaneFlightSubmit = (e) => {
        e.preventDefault();
        const filterFlight = flightsList.filter(filter => filter.flightsId === parseInt(flightDatas, 10));
        const filterAirplane = airplanesList.filter(filter => filter.airplaneId === parseInt(airplaneDatas, 10));
        const postData = {
            flightsId: filterFlight[0].flightsId,
            airplaneId: filterAirplane[0].airplaneId,//projekt do przemodelowania!!!! na zaliczenie napisac sam front od jutra rozpoczac prace nad cala struktura napisac prostym sposobem samym js
        }
        fetch('api/Flights/AirplaneFlight', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        })
            .then(response => response.json())
            .then(() => {
                alert("Element added");
                props.exit();
            })
            .catch(error => console.error('Unable to add item.', error));
    }

    return (
        <>
            {props.selectedManage === "add" ? 
            <div>
                <form onSubmit={AddFlight}>
                    Flight name
                    <input type="text" onChange={handleChange} value={flightDatas.flightName} name="flightName" />
                    <input type="text" onChange={handleChange} value={flightDatas.country} name="country" />
                    <input type="text" onChange={handleChange} value={flightDatas.city} name="city" />
                    <DatePicker selected={flightDatas.departureDate} onChange={date => setFlightDatas({
                        ...flightDatas,
                        departureDate: date
                    })} />
                    <input type="submit" value="Dodaj" />
                </form>
                </div> : ""}
            {props.selectedManage === "remove" ?
                <div>
                    <form onSubmit={SubmitRemoveFlight}>
                        <table className="table">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Flight Name</th>
                                    <th scope="col">Country</th>
                                    <th scope="col">City</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {flightsList.length > 0 ?
                                    flightsList.map(list => (
                                        <tr>
                                            <th scope="row">{list.flightsId}</th>
                                            <td>{list.flightName}</td>
                                            <td>{list.country}</td>
                                            <td>{list.city}</td>
                                            <td><button name={list.flightsId} onClick={RemoveFlight}>Delete</button></td>
                                        </tr>
                                        ))
                                    : ""}
                            </tbody>
                        </table>

                    </form>
                </div>
                : ""}
            {props.selectedManage === "addPlane" ?
                <div>
                    <form onSubmit={AddAirplane}>
                        Airplane name
                    <input type="text" onChange={handleAirplaneChange} value={airplaneDatas.planeName} name="planeName" />
                        <input type="number" onChange={handleAirplaneChange} value={airplaneDatas.numberOfSeats} name="numberOfSeats" />
                        <DatePicker selected={airplaneDatas.date} onChange={dateFlight => setAirplaneDatas({
                            ...airplaneDatas,
                            date: dateFlight
                        })} />
                        <input type="submit" value="Dodaj" />
                    </form>
                </div> : ""}
            {props.selectedManage === "addFlightPlane" ?
                <div>
                    <form onSubmit={AirplaneFlightSubmit}>
                    <h3>Wybierz samolot i lot</h3>
                    Samolot:
                     <select value={airplaneDatas} onChange={(e) => setAirplaneDatas(e.target.value)}>
                        {airplanesList.map(list => (
                            <option value={list.airplaneId}>{list.planeName}</option>
                        ))}
                    </select>
                    Wylot:
                     <select value={flightDatas} onChange={(e) => setFlightDatas(e.target.value)}>
                            {flightsList.map(list => (
                                <option value={list.flightsId}>{list.flightName}</option>
                        ))}
                        </select>
                        <input type="submit" value="Dodaj" />
                    </form>

                </div> : "" }
        </>
        )
}

export default FlightManage;