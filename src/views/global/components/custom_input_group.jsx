/** React */
import React, { Component } from 'react';

/** Helper */
import { saveInput } from '../../../__helpers/helpers';

/**
 * @class
 * @extends Component
 * This component class is being called on login.jsx and signup.jsx <br>
 * This component class shows an input, its own label, and error message . <br>
 * Last updated at: December 19, 2022
 */
class CustomInputGroup extends Component{
    render(){
        const { parent, type, name, label, error_message = undefined, tabIndex } = this.props;
        return(
            <React.Fragment>
                <label htmlFor={name}>{label}</label>
                <input 
                    type={type} 
                    id={name} 
                    name={name} 
                    className={error_message && "error"}
                    onChange={event=> saveInput(parent, event)}
                    tabIndex={tabIndex && tabIndex}
                />
                <p className="error_message">{error_message && error_message}</p>
            </React.Fragment>
        )
    }
}

export default CustomInputGroup;