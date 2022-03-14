import React, { useEffect, useState } from "react";
import "../css/Home.css";
import FetchDatas from "../FetchDatas";
import axios from "axios";

const Home = () => {
    const [Flights, setFlights] = useState([]);
    const [News, setNews] = useState([]);
    useEffect(() => {
        FetchDatas.GetAll('api/Flights/GetFlights', setFlights);
        FetchDatas.Get('api/News', setNews);
        FetchDatas.Get('api/HomePage/BestSeller', setBestSeller);
    }, [])
    console.log(News);
    const [BestSeller, setBestSeller] = useState([]);
    const [isSearched, setIsSearched] = useState(false);
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
            <section className="bestFlights text-center">
                <h3 style={{ marginTop: "5px" }}><b>Bestseller</b></h3>
                <div className="bestFlightsFlex">
                    {Object.keys(BestSeller).length > 0 && <>
                        <h4>{BestSeller.flight}</h4>
                        <h6>Popularity: {BestSeller.count}</h6>
                    </>}
                </div>
            </section>
            {News.length >= 1 ?
                <section className="moreInformations">
                    <h4>Wiadomoœci</h4>
                    <div className="quickNewsFlex">
                        <ul className="flexNewsList">
                            {News.map((news) => (
                                <li key={news.id} className="newsCard">
                                    <img src={window.location.origin + news.imageUrl} className="imgNewsStyle" alt="image" />
                                    <h5>{news.topic}</h5>
                                    <p>{news.content}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section> : ""}
        </div>
    );
};

export default Home;
