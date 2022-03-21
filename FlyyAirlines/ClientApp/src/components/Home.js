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
            <section className="bestFlights">
                <div className="FlightProposals">
                    <span className="textSpacing">POLECANE</span><br />
                    <span style={{ marginLeft:"75px" }} className="textSpacing">WYLOTY<span className="yellowDot">.</span></span>
                </div>
                <div className="flightsSlide">
                    <p></p>
                    <p></p>
                </div>
            </section>
            <section className="moreInformations">
                {News.length >= 1 &&
                    <ul className="flexNewsList">
                        {News.map((news) => (
                            <li key={news.id} className="newsCard text-center">
                                <img src={window.location.origin + news.imageUrl} className="imgNewsStyle" alt="image" />
                                <h6 className = "newsFont">{news.topic}</h6>
                            </li>
                        ))}
                    </ul>
                }</section>
            <section className="usersOpinion">
                <div className="commentUser"></div>
                <div className="commentContent"></div>
            </section>
        </div>
    );
};

export default Home;
