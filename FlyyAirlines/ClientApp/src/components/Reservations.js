import React, { Component } from 'react';
import Auth from "../Auth";
export class Reservations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeFunction: null,
            reservations: [],
            reservationForm: {
                name: "",
                surname: "",
                personIdentity: 0,
                selectedFlight: 0,
                user: Auth.userData.id
            }
        }
    }

    componentDidMount() {
        this.GetReservations();
        console.log(Auth.userData.token);
    }

    GetReservations = () => {
        fetch('api/Users/' + Auth.userData.id, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${Auth.userData.token}`
            }
        })
            .then(res => res.json())
            .then(res => this.setState({ reservations: res.reservations }))
    }

    handleClick = (e) => {
        if (e.target.name === "add") {
            this.setState({
                activeFunction: "add"
            })
            this.AddReservation();
        } else if (e.target.name === "remove") {
            this.setState({
                    activeFunction:"remove"
            })
            this.RemoveReservation();
        }
    }

    AddReservation = () => {
        console.log("Add")
    }

    RemoveReservation = () => {
        console.log("Remove");
    }

    handleChange = (e) => {
        if (e.target.name === "surname" || e.target.name === "name" || e.target.name === "personIdentity") {
            this.setState({
                reservationForm: {
                    ...this.state.reservationForm,
                    [e.target.name]: e.target.value
                }  
            })
        }
    }

    render() {
        return (
            <div>
                <h1>My reservations</h1>
                <div style={{ display: "flex" }}>
                    <button name = "add" onClick={this.handleClick}>Dodaj rezerwacje</button>
                    <button name = "remove" onClick={this.handleClick}>Usuń rezerwacje</button>
                </div>
                {this.state.activeFunction === "add" ?
                    <form>
                        <label>
                            Imię
                            <input name="name" value={this.state.reservationForm.name} onChange={this.handleChange} />
                        </label>
                        <label>
                            Nazwisko
                            <input name="surname" value={this.state.reservationForm.surname} onChange={this.handleChange} />
                        </label>
                        <label>
                            Numer PESEL
                            <input name="personIdentity" value={this.state.reservationForm.personIdentity} onChange={this.handleChange} />
                        </label>
                    </form>
                    : ""}
                {this.state.activeFunction === "remove" ?
                    <div></div>
                    : ""}

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">FlightName</th>
                            <th scope="col">Name</th>
                            <th scope="col">Surname</th>
                            <th scope="col">Number of seats</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.reservations.map(res => (
                            <tr>
                                <th scope="row">1</th>
                                <td>Test</td>
                                <td>Test</td>
                                <td>Test</td>
                            </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        );
    }
}