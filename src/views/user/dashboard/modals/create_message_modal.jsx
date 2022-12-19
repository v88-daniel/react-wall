/** React */
import React, { Component } from 'react';

/** Plugin */
import Modal from 'react-bootstrap/Modal';

/** SCSS */
import './create_message_modal.scss';

/**
 * @class
 * @extends Component
 * This component class is being called on dashboard.jsx <br>
 * This component class shows the modal to create a new message. <br>
 * Last updated at: December 19, 2022
 */
class CreateMessageModal extends Component{

    state = {
        new_message: ""
    }

    /**
     * DOCU: Executes the process of passing the new_message to the createMessage method. Then empties the new_message state. <br>
     * Triggered by a submit event of the form on render(). <br>
     * Last updated at: December 19, 2022
     * @function
     * @memberof CreateMessageModal
     * @param {object} event Required to call the preventDefault method. <br>
     * @author Daniel
     */
    submitMessage = (event) => {
        event.preventDefault();
        const { new_message } = this.state;
        if(new_message){
            this.props.createMessage(new_message);
            this.setState({new_message: ""});
        }
    }

    render(){
        const { new_message } = this.state;
        const { show, onHide } = this.props;
        return(
            <Modal show={show} onHide={onHide} centered id="create_message_modal">
                <Modal.Header closeButton>
                    <Modal.Title>Create a Message</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form method="post" onSubmit={event=>this.submitMessage(event)}>
                        <textarea name="message_input" placeholder="Type your message here." onChange={(event)=>this.setState({new_message: event.target.value})}></textarea>
                        <button type="button" className="cancel_button" onClick={onHide}>Cancel</button>
                        <button type="submit" className={`submit_message_button ${!new_message? "disabled":""}`}>Post Message</button>
                    </form>
                </Modal.Body>

            </Modal>
        )
    }
}

export default CreateMessageModal;