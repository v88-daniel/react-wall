import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import './delete_message_modal.scss';

class DeleteMessageModal extends Component{
    render(){
        const { show, onHide, deleteMessage, message_id} = this.props;
        return(
            <Modal show={show} onHide={onHide} centered id="delete_message_modal">
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete Message</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <p>Are you sure you want to remove this message? This action cannot be undone.</p>
                        <button type="button" className="cancel_button" onClick={onHide}>Cancel</button>
                        <button type="submit" className="remove_button" onClick={() => deleteMessage(message_id)}>Yes, Remove it.</button>
                    </form>
                </Modal.Body>
            </Modal>
        )
    }
}

export default DeleteMessageModal;