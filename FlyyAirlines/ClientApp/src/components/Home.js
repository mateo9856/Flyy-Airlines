import React, { Component } from 'react';
import Auth from '../Auth';
import "../css/Home.css";
import { JoinTheClub } from "../images/joinTheClub.jpg";
import { Ecology } from "../images/ecology.jpg";
import { Progress } from "../images/progress.jpg"
export class Home extends Component {
  static displayName = Home.name;
    constructor(props) {
        super(props);

        this.quickNews = [
            {
                id: 0,
                title: "Klub Flyy!",
                content: "Do³¹cz do klubu Flyy! Airlines, dodatkowe zni¿ki oraz promocje...",
                img: JoinTheClub
            },
            {
                id: 1,
                title: "Bêdziesz EKO!",
                content: "Samoloty naszych linii lotniczych przechodz¹ najnowsze normy emisji spalin",
                img: Ecology
            },
            {
                id: 2,
                title: "Jesteœmy coraz lepsi!",
                content: "Nasze linie stale rozwijaj¹ siê o wyloty do innych pañstw i miast.",
                img: Progress
            }
        ]

        this.state = {
            leavingValue: "",
            destinationValue: "",
            departureDate: this.getActualDate()
        }
    }

    getActualDate() {
        let date = new Date().toLocaleDateString();
        date = date.split('');
        for (let i = 0; i < date.length; i++) {
            if (date[i] === ".") {
                date[i] = "-"
            }
        }
        date.join('');
        return date;
    }

    handleChange = (e) => {

    }

    handleSubmit() {

    }

  render () {
      return (
          <div className="homePage">
              <div className = "searchDiv">
              <div className="quickNotifications">
                  <div className="quickReservations">
                      <form onSubmit={this.handleSubmit.bind(this)}>
                              <label htmlFor="leavings">
                                  <input type="text" onChange={this.handleChange} placeholder="Leaving from" value={this.state.leavingValue} />
                          </label>
                          <label htmlFor="destiantion">
                                  <input type="text" onChange={this.handleChange} placeholder="Destination" value={this.state.destinationValue} />
                                  {/*Zmienie tu na selecta i option po dodaniu lotnisk*/}
                          </label>
                          <label htmlFor="departure">
                              <input type="date" placeholder="Departure date" value={this.state.departureDate} />
                          </label>
                      </form>
                      </div>
                      </div>
              </div>
              <section className="bestFlights">
                  <h4 style={{ marginTop: "15px" }}>Najpopularniejsze loty</h4>
                  <div className="bestFlightsFlex">
                      {/*Implementacja wartoœci tablicy z 3 najpopularniejszymi wylotami!  Pobraæ z API*/ }
                  </div>
              </section>
              <section className="moreInformations">
                  <h4>Wiadomoœci</h4>
                  <div className="quickNewsFlex">
                      <ul className = "flexNewsList">
                          {this.quickNews.map(news => (
                              <li key={news.id} className="newsCard">
                                  <img src={news.img} className="imgNewsStyle" alt="image" />
                                  <h5>{news.title}</h5>
                                  <p>{news.content}</p>
                              </li>    
                          ))}
                      </ul>
                  </div>
                  {/*Implementacja 3 artyku³ów u¿ywaj¹c mapa*/ }
              </section>
          </div>
    );
  }
}
