import React, { Component } from 'react';
//informacje jak wysyla sie fetcha - nie trzeba podawac localhost itp wewnatrz metody a tylko sciezke dalsza czyli np. ('api/Users')
export class Login extends Component {

  constructor(props) {
    super(props);
      this.state = {
          email: "",
          password: ""
      };
  }

    handleSubmit = (e) => {
        const sendValues = {
            email: this.state.email,
            password: this.state.password
        }
        e.preventDefault();
        console.log("test");
        fetch('api/account/login', {
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
        console.log(e.target.name);
        console.log(e.target.value);
        this.setState({
            [e.target.name]: e.target.value
        })
    }

  render() {
      return (
          <>
              <form onSubmit={this.handleSubmit}>
                  <label>
                      <b>Login</b>
                      <input type="text" name="email" value={this.state.email} onChange={this.WriteValue} />
                  </label>
                  <label>
                      <b>Haslo</b>
                      <input type="text" name="password" value={this.state.password} onChange={this.WriteValue} />
                  </label>
                  <input type="submit" value="Zaloguj!" onSubmit={this.handleSubmit} />
              </form>
          </>
        );
  }
}
