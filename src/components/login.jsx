import React, { Component } from 'react';
import BackroundImage       from '../images/person.svg';
import './login.scss';

class Login extends Component{
    render(){
        return(
            <div id="login">
                <div className="form_container">
                    <form id="login_form">
                        <h2>The Wall</h2>
                        <h1>Log In</h1>

                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email"/>
                        <p className="error_message"></p>

                        <div id="password_area">
                            <label htmlFor="password">Password</label>
                            <a href="#">Forgot Password?</a>
                        </div>
                        <input type="password" name="password" id="password" />
                        <p className="error_message"></p>

                        <button type="submit">Sign In</button>
                        <p className="switch_form">Don't have an account? <a href="#">Sign up</a></p>
                    </form>
                </div>
                <div className="image_container">
                    <img src={BackroundImage} alt="A person standing while holding a document" />
                </div>
            </div>
        )
    }
}

export default Login;