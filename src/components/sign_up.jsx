import React, { Component } from 'react';
import BackroundImage       from '../images/person.svg';
import './sign_up.scss';

class SignUp extends Component{
    render(){
        return(
            <div id="sign_up">
                <div className="form_container">
                    <form id="sign_up_form">
                        <h2>The Wall</h2>
                        <h1>Register</h1>

                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" />
                        <p className="error_message"></p>

                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" />
                        <p className="error_message"></p>

                        <label htmlFor="confirm_password">Confirm Password</label>
                        <input type="password" name="confirm_password" id="confirm_password" />
                        <p className="error_message"></p>

                        <p id="disclaimer">By creating an account, you agree with The Wall's <a href="#">Privacy Policy</a> and <a href="#">Term's of Use.</a></p>

                        <button type="submit">Sign Up</button>
                        <p className="switch_form">Already have an account? <a href="#">Sign in</a></p>
                    </form>
                </div>
                <div className="image_container">
                    <img src={BackroundImage} alt="A person standing while holding a document" />
                </div>
            </div>
        )
    }
}

export default SignUp;