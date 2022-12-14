import React, { Component } from 'react';
import user_icon from '../images/user_icon.png';
import DeleteCommentModal from './delete_comment_modal';
// import './comment.scss';

class Comment extends Component{
    state = {
        is_show_edit_form: false,
        is_show_delete_modal: false,
        updated_comment: null
    }

    toggleEditForm = (is_show_edit_form, comment = null) => this.setState({is_show_edit_form: !is_show_edit_form, updated_comment: comment});

    getUpdatedComment = (updated_comment) => this.setState({updated_comment: updated_comment});

    updateComment = (event, comment_id) => {
        event.preventDefault();
        const { updated_comment } = this.state;
        if(updated_comment){
            this.props.updateComment(this.props.message_id, comment_id, updated_comment);
            this.setState({is_show_edit_form: false});
        }
    }

    showDeleteModal = (is_show_delete_modal) => this.setState({is_show_delete_modal: !is_show_delete_modal});

    render(){
        const { is_show_edit_form, is_show_delete_modal, updated_comment } = this.state;
        const { message_id, comment, deleteComment } = this.props;
        return(
            <li className="comment">
                {
                    !is_show_edit_form ?
                    <React.Fragment>
                        <p className="text_content">{comment.comment}</p>
                        <div className="actions">
                            <button type="submit" className="toggle_edit_button" onClick={() => this.toggleEditForm(is_show_edit_form, comment.comment)}><span></span> Edit</button>
                            <button type="submit" className="toggle_delete_button" onClick={() => this.showDeleteModal(is_show_delete_modal)}><span></span> Delete</button>
                        </div>
                        <div className="post_info">
                            <img src={user_icon} alt="User icon" />
                            <div className="posted_by">You</div> -
                            <div className="post_time">Few seconds ago</div>
                        </div>
                    </React.Fragment>
                    :
                    <form className="edit_form" onSubmit={(event) => this.updateComment(event, comment.id)}>
                        <textarea name="edit_input" value={updated_comment} onChange={(event) => this.getUpdatedComment(event.target.value)}></textarea>
                        <button type="button" className="cancel_button" onClick={() => this.toggleEditForm(is_show_edit_form)}>Cancel</button>
                        <button type="submit" className={`submit_edit_button ${updated_comment ? "":"disabled"}`}>Update Comment</button>
                    </form>
                }
                {
                    is_show_delete_modal &&
                    <DeleteCommentModal 
                        show={is_show_delete_modal} 
                        onHide={() => this.setState({is_show_delete_modal: !is_show_delete_modal})} 
                        deleteComment={deleteComment}
                        message_id={message_id}
                        comment_id={comment.id}/>
                }
            </li>
        )
    }
}

export default Comment;