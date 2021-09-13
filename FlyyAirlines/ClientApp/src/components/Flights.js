import React, { useEffect, useState } from 'react';
import FetchDatas from '../FetchDatas';
import axios from "axios";

const convertString = (string) => {
    const regex = /[-|T]/gi;
    return string.replace(regex, " ").substring(0, 16);
}


const FlightsComponent = () => {
    const [Flights, setFlights] = useState([]);

    useEffect(() => {
        FetchDatas.GetAll('api/Flights/GetFlights', setFlights);
    }, [])

    return (
        <>
            <h4 className="text-center">Aktualne wyloty</h4>
            <table className="table table-stripped">
                <thead>
                    <tr>
                        <th scope="col">Wylot z</th>
                        <th scope="col">Cel</th>
                        <th scope="col">Data wylotu</th>
                        <th scope="col">Miejsca</th>
                    </tr>
                </thead>
                <tbody>
                    {Flights.length > 0 ?
                        Flights.map(flight => (
                            <tr>
                                <th scope="row">{`${flight.fromCity} : `}<b>{`${flight.fromCountry}`}</b></th>
                                <td>{flight.toCity + " : "}<b>{flight.toCountry}</b></td>
                                <td>{convertString(flight.departureDate)}</td>
                                <td>{flight.airplane.numberOfSeats}</td>
                            </tr>
                        )) : ""
                    }
                </tbody>
            </table>
        </>
    )
}

export default FlightsComponent;