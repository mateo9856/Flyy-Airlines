import React, { Component, PureComponent } from 'react';
import { withRouter } from "react-router-dom";
import '../css/Login.css';
import Auth from "../Auth";
import Cookies from 'js-cookie';
class Login extends PureComponent {

  constructor(props) {
    super(props);
      this.state = {
          email: "",
          password: "",
          loginSuccesful: false,
      };
    }
    componentDidMount() {
        console.log("Mounted");
    }
    componentDidUpdate() {
        console.log("Updated");
        if (this.state.loginSuccesful) {
            console.log(this.state.loginSuccesful)
            this.RedirectToHome();
        }
    }

        request(val) {
        fetch('api/account/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(val)
        })
            .then(res => res.json())
            .then(res => {
                localStorage.setItem('login', JSON.stringify(res))
                Auth.login();
                Auth.getUserRole();
                this.setState({
                    loginSuccesful: true
                })
            }).catch(err => console.log(err))
            
    }

     handleSubmit = (e) => {
        e.preventDefault();
        const sendValues = {
            email: this.state.email,
            password: this.state.password
        }
         this.request(sendValues);
    }

    RedirectToHome = () => {
        Auth.login();
        this.props.handleLogin(true);
        const { history } = this.props;
        history.push('/');
        console.log(Auth.authenticated)
        this.props.history.push("/");
    }
    
    WriteValue = (e) => {
        console.log(e.target.name);
        console.log(e.target.value);
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        const { history } = this.props;
      return (
          <div className="form-box">
              <form className = "registerLoginForm" onSubmit={this.handleSubmit}>
                  <label>

                      <input type="text" placeholder="E-mail" className="input-field" name="email" value={this.state.email} onChange={this.WriteValue} />
                  </label>
                  <label>
                      
                      <input type="text" placeholder="Password" className = "input-field" name="password" value={this.state.password} onChange={this.WriteValue} />
                  </label>
                  <input type="submit" className="submit-btn" value="Zaloguj!" onSubmit={this.handleSubmit} />
              </form>
          </div>
        );
  }
}
export const Log = withRouter(Login);
