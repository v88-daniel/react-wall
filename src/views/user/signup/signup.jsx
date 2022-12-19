import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../login/login.scss';
import './signup.scss';
import backround_image from '../../../assets/images/person.svg';
import { saveInput, setErrorMessage } from '../../../__helpers/helpers';

class Signup extends Component{

    state = {}

    validateForm = event => {
        event.preventDefault();
        const { email, password, confirm_password } = this.state;
        let error_count = 0;

        if(!email){
            setErrorMessage(this, "email_error", "Please enter your email");
            error_count++;
        }
        else{
            setErrorMessage(this, "email_error", "");
        }

        if(!password){
            setErrorMessage(this, "password_error", "Please enter your password");
            error_count++;
        }
        else{
            setErrorMessage(this, "password_error", "");
        }

        if(!confirm_password){
            setErrorMessage(this, "confirm_password_error", "Confirm also your password");
            error_count++;
        }
        else if(confirm_password !== password){
            setErrorMessage(this, "confirm_password_error", "Entered passwords doesn't match");
            error_count++;
        }
        else{
            setErrorMessage(this, "confirm_password_error", "");
        }

        if(error_count === 0){
            this.props.signup();
        }
    }

    render(){
        const { email_error, password_error, confirm_password_error } = this.state;
        return(
            <div id="signup">
                <div className="form_container">
                    <form method="post" onSubmit={event=>this.validateForm(event)}>
                        <h2>The Wall</h2>
                        <h1>Register</h1>

                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" tabIndex={1} onChange={event=>saveInput(this, event)} className={email_error? "error": ""}/>
                        <p className="error_message">{email_error? email_error:""}</p>

                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" tabIndex={2} onChange={event=>saveInput(this, event)} className={password_error? "error": ""}/>
                        <p className="error_message">{password_error? password_error:""}</p>

                        <label htmlFor="confirm_password">Confirm Password</label>
                        <input type="password" name="confirm_password" id="confirm_password" tabIndex={3} onChange={event=>saveInput(this, event)} className={confirm_password_error? "error": ""}/>
                        <p className="error_message">{confirm_password_error? confirm_password_error:""}</p>

                        <div id="disclaimer">By creating an account, you agree with The Wall's <Link>Privacy Policy</Link> and <Link>Terms of Use</Link>.</div>

                        <button type="submit" tabIndex={4}>Sign up</button>

                        <p className="form_switch">Already have an account? <Link to="/" tabIndex={5}>Sign in</Link></p>
                    </form>
                </div>
                <div className="image_container">
                    <img src={backround_image} alt="A person standing while holding a document" />
                </div>
            </div>
        )
    }
}

export default Signup;