/** React */
import React, { Component } from 'react';

/** Plugin */
import Modal from 'react-bootstrap/Modal';

/** CSS */
import './delete_message_modal.scss';

/**
 * @class
 * @extends Component
 * This component class is being called on dashboard.jsx <br>
 * This component class shows the modal to confirm the deletion of a message. <br>
 * Last updated at: December 19, 2022
 */
class DeleteMessageModal extends Component{

    /**
     * DOCU: Executes the process of passing the message_id to the deleteMessage method. <br>
     * Triggered by a submit event of the form on render(). <br>
     * Last updated at: December 19, 2022
     * @function
     * @memberof CreateMessageModal
     * @param {object} event Required to call the preventDefault method. <br>
     * @author Daniel
     */
    deleteMessage = event => {
        event.preventDefault();
        this.props.deleteMessage(this.props.message_id);
    }
    
    render(){
        const { show, onHide } = this.props;
        console.log(show)
        return(
            <Modal show={show} onHide={onHide} centered id="delete_message_modal">
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete Message</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form method="post" onSubmit={event=>this.deleteMessage(event)}>
                        <p>Are you sure you want to remove this message? This action cannot be undone.</p>
                        <button type="button" className="cancel_button" onClick={onHide}>Cancel</button>
                        <button type="submit" className="remove_button">Yes, Remove it.</button>
                    </form>
                </Modal.Body>
            </Modal>
        )
    }
}

export default DeleteMessageModal;