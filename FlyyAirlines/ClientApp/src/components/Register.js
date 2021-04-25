import React, { Component } from 'react';

export class Register extends Component {
  

  constructor(props) {
    super(props);
      this.state = {
          email: "",
          userName: "",
          password: ""
      };
    }

    handleSubmit = (e) => {
        const sendValues = {
            email: this.state.email,
            userName: this.state.userName,
            password: this.state.password
        }
        e.preventDefault();
        console.log("test");
        fetch('api/account/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sendValues)
        })
            .then(res => res.json())
            .then(res => console.log(res));
    }

    WriteValue = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
  render() {
    return (
        <div>
            <form onSubmit={this.handleSubmit}>
                <label>
                    Email:
                <input type="text" name="email" value={this.state.email} onChange={this.WriteValue} />
                </label>
                <label>
                    Login:
                <input type="text" name="userName" value={this.state.userName} onChange={this.WriteValue} />
                </label>
                <label>
                    Haslo:
                <input type="text" name="password" value={this.state.password} onChange={this.WriteValue} />
                </label>
                <input type="submit" value="Zarejestruj" />
            </form>
      </div>
    );
  }
}
