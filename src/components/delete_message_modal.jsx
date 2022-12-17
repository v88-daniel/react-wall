import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import './delete_message_modal.scss';

class DeleteMessageModal extends Component{

    deleteMessage = event => {
        event.preventDefault();
        this.props.deleteMessage(this.props.post_id);
    }
    
    render(){
        const { show, onHide } = this.props;
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