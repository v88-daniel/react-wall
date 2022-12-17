export const saveInput = (component, event) => {
    component.setState({[event.target.name]: event.target.value});
}

export const setErrorMessage = (component, state, error_message) => {
    component.setState({[state]: error_message});
}