import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';

class DeleteCommentModal extends Component{

    deleteComment = event => {
        event.preventDefault();
        const { comment_id, message_id } = this.props;
        this.props.deleteComment(comment_id, message_id);
    }
    
    render(){
        const { show, onHide } = this.props;
        return(
            <Modal show={show} onHide={onHide} centered id="delete_comment_modal">
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete Comment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form method="post" onSubmit={event=>this.deleteComment(event)}>
                        <p>Are you sure you want to remove this comment? This action cannot be undone.</p>
                        <button type="button" className="cancel_button" onClick={onHide}>Cancel</button>
                        <button type="submit" className="remove_button" onClick={event=>this.deleteComment(event)}>Yes, Remove it.</button>
                    </form>
                </Modal.Body>
            </Modal>
        )
    }
}

export default DeleteCommentModal;