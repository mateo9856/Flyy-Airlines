import React, { useEffect, useState } from "react";
import "../css/Home.css";
import JoinTheClub from "../images/joinTheClub.jpg";
import Ecology from "../images/ecology.jpg";
import Progress from "../images/progress.jpg";
import FetchDatas from "../FetchDatas";

const quickNews = [
    {
        id: 0,
        title: "Klub Flyy!",
        content:
            "Do³¹cz do klubu Flyy! Airlines, dodatkowe zni¿ki oraz promocje...",
        img: JoinTheClub,
    },
    {
        id: 1,
        title: "Bêdziesz EKO!",
        content:
            "Samoloty naszych linii lotniczych przechodz¹ najnowsze normy emisji spalin",
        img: Ecology,
    },
    {
        id: 2,
        title: "Jesteœmy coraz lepsi!",
        content:
            "Nasze linie stale rozwijaj¹ siê o wyloty do innych pañstw i miast.",
        img: Progress,
    },
];
const Home = () => {

    useEffect(() => {
        const datas = FetchDatas.Get('api/Flights/GetFlights', setFlights);
        console.log(datas);
    }, [])

    const [isSearched, setIsSearched] = useState(false);
    const [Flights, setFlights] = useState([]);
    const [searchedFlight, setSearchedFlight] = useState([]);
    const [datas, setDatas] = useState({
        leavingValue: "",
        destinationValue: "",
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSearched(true);
        const getFlight = Flights.filter(t => t.fromCity === datas.leavingValue && t.toCity === datas.destinationValue);
        setSearchedFlight(getFlight);
    };
    const handleChange = (e) => {
        setDatas({
            ...datas,
            [e.target.name]: e.target.value
        })
    };
    return (
        <div className="homePage">
            <div className="searchDiv">
                <div className="quickNotifications d-flex justify-content-beetween">
                    <div className="quickReservations">
                        <h6 className="text-white text-center text-uppercase">Szybie wyszukiwanie</h6>
                        {Flights.length > 0 &&
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="leavings">
                                    <select value={datas.leavingValue} className="form-select form-select-sm" name="leavingValue" onChange={handleChange}>
                                        {Flights.map((flight) => (
                                            <option value={flight}>{flight}</option>
                                        ))}
                                    </select>
                                </label>
                                <label htmlFor="destiantion">
                                    <select className="form-select form-select-sm" style={{ marginTop: "10px" }} value={datas.destinationValue} name="destinationValue" onChange={handleChange}>
                                        {Flights.map((flight) => (
                                            <option value={flight}>{flight}</option>
                                        ))}
                                    </select>
                                </label>
                                <input style={{ marginTop: "10px" }} className="btn btn-primary" type="submit" value="Wyszukaj!" />
                            </form> }
                    </div>
                    {isSearched ? <div className="searchSubmit">
                        <button className="exitBtn" onClick={() => setIsSearched(false)}>X</button>
                        <h4>Wyniki:</h4>
                        <ul className="list-group">
                            {searchedFlight.length > 0 ? searchedFlight.map(list => (
                                <li key={list.id} className="quickSearchList list-group-item">{list.flightName}</li>
                            )) : <h5 className="text-uppercase text-center">Brak lotów!</h5>}
                        </ul>
                    </div> : ""}
                </div>
            </div>
            <section className="bestFlights text-center">
                <h3 style={{ marginTop: "5px" }}>Nasz Bestseller</h3>
                <div className="bestFlightsFlex">
                    
                </div>
            </section>
            <section className="moreInformations">
                <h4>Wiadomoœci</h4>
                <div className="quickNewsFlex">
                    <ul className="flexNewsList">
                        {quickNews.map((news) => (
                            <li key={news.id} className="newsCard">
                                {<img src={news.img} className="imgNewsStyle" alt="image" />}
                                <h5>{news.title}</h5>
                                <p>{news.content}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </div>
    );
};

export default Home;
