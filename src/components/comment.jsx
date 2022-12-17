import React, { Component } from 'react';
import user_icon from '../images/user_icon.png';
import DeleteCommentModal from './delete_comment_modal';

class Comment extends Component{

    state = {
        is_show_delete_modal: false,
        is_show_edit_form: false,
        updated_comment: null,
    }

    getComment = (event) => {
        this.setState({updated_comment: event.target.value});
    }

    toggleEditForm = (is_show, comment = null) => {
        this.setState({updated_comment: comment, is_show_edit_form: is_show});
    }

    submitEdit = (event, message_id, comment_id) => {
        event.preventDefault();
        const { updated_comment } = this.state;
        if(updated_comment){
            this.props.editComment(message_id, comment_id, updated_comment);
            this.setState({is_show_edit_form: false});
        }
    }

    render(){
        const { is_show_delete_modal, updated_comment, is_show_edit_form } = this.state;
        const { comment, deleteComment, message_id } = this.props;

        return(
            <React.Fragment>
                <li className="comment">
                    {
                        !is_show_edit_form ?
                        <React.Fragment>
                            <p className="text">{comment.comment}</p>
                            <div className="actions">
                                <button type="button" className="toggle_edit_button" onClick={()=>this.toggleEditForm(true, comment.comment)}><span></span>Edit</button>
                                <button type="button" className="toggle_delete_button" onClick={()=>this.setState({is_show_delete_modal: true})}><span></span>Delete</button>
                            </div>
                            <p className="post_info">
                                <img src={user_icon} alt="user icon" />
                                <span>You</span><span>-</span><span>Few seconds ago</span>
                            </p>
                        </React.Fragment>
                        :
                        <form className="edit_form" method="post" onSubmit={event=>this.submitEdit(event, message_id, comment.id)}>
                            <textarea name="edit_input" defaultValue={updated_comment} onChange={event=>this.getComment(event)}></textarea>
                            <button type="button" className="cancel_button" onClick={()=>this.toggleEditForm(false)}>Cancel</button>
                            <button type="submit" className={`submit_edit_button  ${!updated_comment? "disabled":""}`}>Update Comment</button>
                        </form>
                    }
                </li>
                {
                    is_show_delete_modal &&
                    <DeleteCommentModal show={is_show_delete_modal} onHide={()=>this.setState({is_show_delete_modal: false})} deleteComment={deleteComment} comment_id={comment.id} message_id={message_id}/>
                }
            </React.Fragment>
        )
    }
}

export default Comment;