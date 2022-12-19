/** React */
import React, { Component }           from 'react';

/** Plugins */
import { Link }                       from 'react-router-dom';

/** Helpers */
import { saveInput, setErrorMessage } from '../../../__helpers/helpers';

/** Image */
import backround_image                from '../../../assets/images/person.svg';

/** CSS */
import './login.scss';
import CustomInputGroup from '../../global/components/custom_input_group';

/**
 * @class
 * @extends Component
 * This component class is being called on App.js <br>
 * This component class shows the whole login page. <br>
 * Last updated at: December 19, 2022
 */
class Login extends Component{

    state = {
        login_credentials: {
            email: "daniel@gmail.com",
            password: "12345"
        }
    }

    /**
     * DOCU: Function to validate form. <br>
     * Triggered by a submit event of the form on render(). <br>
     * Last updated at: December 17, 2022
     * @function
     * @memberof Login
     * @param {object} event Required to call the preventDefault method. <br>
     * @author Daniel
     */
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

                        <CustomInputGroup parent={this} type="email" name="email" label="Email" error_message={email_error} tabIndex={1}/>

                        <p id="password_area">
                            <label htmlFor="password">Password</label>
                            <Link tabIndex={4}>Forgot Password</Link>
                        </p>
                        <input 
                            type="password" 
                            name="password" 
                            id="password" 
                            onChange={event=> saveInput(this, event)}  
                            className={password_error && "error"}
                            tabIndex={2}
                        />
                        <p className="error_message">{password_error && password_error}</p>

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