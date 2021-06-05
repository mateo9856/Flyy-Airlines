import React, { useEffect } from 'react';
import FetchDatas from '../FetchDatas';
import Flights from "../models/Flights";

const convertToName = (string) => {
    let stringName = "";
    const convert = string.split('.');
    let deleteSecondsArr = convert[2].split(' ');
    const deleteSeconds = deleteSecondsArr[1].substring(0, 5);
    deleteSecondsArr[1] = deleteSeconds;
    deleteSecondsArr = deleteSecondsArr.join(' ');
    convert[2] = deleteSecondsArr;
    switch (convert[1]) {
        case '01':
            stringName = "styczeń"
            break;
        case '02':
            stringName = "luty"
            break;
        case '03':
            stringName = "marzec"
            break;
        case '04':
            stringName = "kwiecień"
            break;
        case '05':
            stringName = "maj"
            break;
        case '06':
            stringName = "czerwiec"
            break;
        case '07':
            stringName = "lipiec"
            break;
        case '08':
            stringName = "czerwiec"
            break;
        case '09':
            stringName = "wrzesień"
            break;
        case '10':
            stringName = "październik"
            break;
        case '11':
            stringName = "listopad"
            break;
        case '12':
            stringName = "grudzień"
            break;
    }
    return convert.join(' ').replace(convert[1], stringName)
}

const FlightsComponent = () => {
    const [Flights, setFlights] = useState([]);

    useEffect(() => {
        FetchDatas.Get('api/Flights/GetFlights', setFlights);
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
                    {Flights.map(flight => (
                        <tr>
                            <th scope="row">{`${flight.from.city} : `}<b>{`${flight.from.country}`}</b></th>
                            <td>{flight.to.city + " : "}<b>{flight.to.country}</b></td>
                            <td>{convertToName(flight.departureDate)}</td>
                            <td>{flight.airplane.numberOfSeats}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default FlightsComponent;