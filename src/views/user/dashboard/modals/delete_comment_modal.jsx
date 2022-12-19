/** React */
import React, { Component } from 'react';

/** Plugin */
import Modal from 'react-bootstrap/Modal';

/**
 * @class
 * @extends Component
 * This component class is being called on dashboard.jsx <br>
 * This component class shows the modal to confirm the deletion of a comment. <br>
 * Last updated at: December 19, 2022
 */
class DeleteCommentModal extends Component{

    /**
     * DOCU: Executes the process of passing the comment_id and message_id to the deleteComment method. <br>
     * Triggered by a submit event of the form on render(). <br>
     * Last updated at: December 19, 2022
     * @function
     * @memberof CreateMessageModal
     * @param {object} event Required to call the preventDefault method. <br>
     * @author Daniel
     */
    deleteComment = event => {
        event.preventDefault();
        const { comment_to_delete: {comment_id, message_id} } = this.props;
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