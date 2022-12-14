import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import './delete_message_modal.scss';

class DeleteCommentModal extends Component{
    render(){
        const { show, onHide, deleteComment, message_id, comment_id} = this.props;
        return(
            <Modal show={show} onHide={onHide} centered id="delete_comment_modal">
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete Comment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <p>Are you sure you want to remove this comment? This action cannot be undone.</p>
                        <button type="button" className="cancel_button" onClick={onHide}>Cancel</button>
                        <button type="submit" className="remove_button" onClick={() => deleteComment(message_id, comment_id)}>Yes, Remove it.</button>
                    </form>
                </Modal.Body>
            </Modal>
        )
    }
}

export default DeleteCommentModal;