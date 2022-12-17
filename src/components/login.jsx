import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './login.scss';
import backround_image from '../images/person.svg';
import { saveInput, setErrorMessage } from '../helpers/helpers';

class Login extends Component{

    state = {
        login_credentials: {
            email: "daniel@gmail.com",
            password: "12345"
        }
    }

    validateForm = event => {
        event.preventDefault();
        const { email, password, login_credentials: {email:email_credential, password:password_credential} } = this.state;
        let error_counter = 0;
        
        if(!email){
            setErrorMessage(this, "email_error", "Please enter your email");
            error_counter++;
        }
        else if(email !== email_credential){
            setErrorMessage(this, "email_error", "Email not found");
            error_counter++;
        }
        else{
            setErrorMessage(this, "email_error", "");
        }

        if(!password){
            setErrorMessage(this, "password_error", "Please enter your password");
            error_counter++;
        }
        else if(email && password !== password_credential){
            setErrorMessage(this, "password_error", "Incorrect password");
            error_counter++;
        }
        else{
            setErrorMessage(this, "password_error", "");
        }

        if(error_counter === 0){
            this.props.login();
        }
    }

    render(){
        const { email_error, password_error } = this.state
        return(
            <div id="login">
                <div className="form_container">
                    <form method="post" onSubmit={event=>this.validateForm(event)}>
                        <h2>The Wall</h2>
                        <h1>Log In</h1>

                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" onChange={event=> saveInput(this, event)} tabIndex={1} className={email_error? "error":""}/>
                        <p className="error_message">{email_error? email_error:""}</p>

                        <p id="password_area">
                        <label htmlFor="password">Password</label>
                        <Link tabIndex={4}>Forgot Password</Link>
                        </p>
                        <input type="password" name="password" id="password" onChange={event=> saveInput(this, event)} tabIndex={2} className={password_error? "error":""}/>
                        <p className="error_message">{password_error? password_error:""}</p>

                        <button type="submit" tabIndex={3}>Sign in</button>

                        <p className="form_switch">Don't have an account? <Link to="signup">Sign up</Link></p>
                    </form>
                </div>
                <div className="image_container">
                    <img src={backround_image} alt="A person standing while holding a document" />
                </div>
            </div>
        )
    }
}

export default Login;