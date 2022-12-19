/**
 * DOCU: Saves an input value to the state of the class where it belongs... <br>
 * Triggered on signup.jsx and login.jsx <br>
 * Last updated at: December 19, 2022
 * @param {component class} component Required to call the setState
 * @param {object} event Required to get the name and value of the input target property
 * @author Daniel
 */
export const saveInput = (component, event) => {
    component.setState({[event.target.name]: event.target.value});
}

/**
 * DOCU: Sets an error message to the state of the class where the error message element belongs... <br>
 * Triggered on signup.jsx and login.jsx <br>
 * Last updated at: December 19, 2022
 * @param {component class} component Required to call the setState
 * @param {string} state Required to get the name of the state
 * @param {string} error_message Required set the error message
 * @author Daniel
 */
export const setErrorMessage = (component, state, error_message) => {
    component.setState({[state]: error_message});
}

/**
 * DOCU: Generates an id using the date object. <br>
 * @returns a date in milliseconds format
 * @author Daniel
 */
export const generateID = () => {
    return new Date().getTime();
}