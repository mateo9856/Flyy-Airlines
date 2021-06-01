import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import '../css/Register.css';
import Auth from '../Auth';
class Register extends PureComponent {  

  constructor(props) {
    super(props);
      this.state = {
          email: "",
          userName: "",
          password: "",
          registerSuccesful: false
      };
    }

    componentDidUpdate() {
        if (this.state.registerSuccesful) {
            this.Redirect();
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();

            const sendValues = {
                email: this.state.email,
                userName: this.state.userName,
                password: this.state.password
            }

            fetch('api/account/register', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(sendValues)
            })
                .then(res => res.json())
                .then(res => {
                    this.setState({
                        registerSuccesful: true
                    })
                });
    }

    WriteValue = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    Redirect = () => {
        const { history } = this.props;
        history.push('/RegisterSubmit');
        console.log(Auth.authenticated)
        this.props.history.push("/RegisterSubmit");
    }

    render() {
        const { history } = this.props;
    return (
        <div>
            <div className="form-box">
                <form className = "registerLoginForm" onSubmit={this.handleSubmit}>
                <label>

                        <input className="input-field" placeholder="E-mail" type="text" name="email" value={this.state.email} onChange={this.WriteValue} required />
                    </label>
                    
                        <label>
                        <input className="input-field" placeholder="User name" type="text" name="userName" value={this.state.userName} onChange={this.WriteValue} required />
                        </label>
                 
                    <label>
                        <input className="input-field" placeholder="Password" type="text" name="password" value={this.state.password} onChange={this.WriteValue} required />
                    </label>
                    <br />
                    <input type="checkbox" className="check-box" /><span>Remember me</span>
                <input type="submit" className = "submit-btn" value="Zarejestruj" />
                    </form>
            </div>
      </div>
    );
  }
}

export const Reg = withRouter(Register);