/** React */
import React, { Component }           from 'react';

/** Plugins */
import { Link }                       from 'react-router-dom';

/** Helpers */
import { saveInput, setErrorMessage } from '../../../__helpers/helpers';

/** Image */
import backround_image                from '../../../assets/images/person.svg';

/** CSS */
import '../login/login.scss';
import './signup.scss';
import CustomInputGroup from '../../global/components/custom_input_group';

/**
 * @class
 * @extends Component
 * This component class is being called on App.js <br>
 * This component class shows the whole signup page. <br>
 * Last updated at: December 19, 2022
 */
class Signup extends Component{

    state = {}

    /**
     * DOCU: Function to validate form. <br>
     * Triggered by a submit event of the form on render(). <br>
     * Last updated at: December 17, 2022
     * @function
     * @memberof Signup
     * @param {object} event Required to call the preventDefault method. <br>
     * @author Daniel
     */
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

                        <CustomInputGroup parent={this} type="email" name="email" label="Email" error_message={email_error} tabIndex={1}/>

                        <CustomInputGroup parent={this} type="password" name="password" label="Password" error_message={password_error} tabIndex={2}/>

                        <CustomInputGroup parent={this} type="password" name="confirm_password" label="Confirm Password" error_message={confirm_password_error} tabIndex={3}/>

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