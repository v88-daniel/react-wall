import React, { Component } from 'react';
import './message.scss'
import user_icon from '../images/user_icon.png';
import DeleteMessageModal from './delete_message_modal';
import Comment from './comment';
class Message extends Component{

    state = {
        is_show_delete_modal: false,
        is_show_edit_form: false,
        is_show_comments: false,
        updated_message: "",
        new_comment: ""
    }

    toggleEditForm = (is_show, message = "") => {
        this.setState({is_show_edit_form: is_show, updated_message: message})
    }

    getMessage = (event) => {
        this.setState({updated_message: event.target.value});
    }

    submitEdit = (event, message_id) => {
        event.preventDefault();
        const { updated_message } = this.state;
        if(updated_message){
            this.props.editMessage(message_id, updated_message);
            this.setState({is_show_edit_form: false});
        }
    }

    getComment = (event) => {
        this.setState({new_comment: event.target.value});
    }

    submitComment = (event, message_id, new_comment) => {
        event.preventDefault();
        if(new_comment){
            this.props.addComment(message_id, new_comment);
            this.setState({new_comment: ""});
        }
    }

    render(){
        const { is_show_delete_modal, is_show_edit_form, is_show_comments, updated_message, new_comment } = this.state;
        const { post, deleteMessage, deleteComment, editComment } = this.props;
        return(
            <React.Fragment>
                <li className="message">
                    {
                        !is_show_edit_form ?
                        <React.Fragment>
                            <p className="text">{post.message}</p>
                            <div className="actions">
                                <button type="button" className={`toggle_comment_button ${post.comments.length? "has_comment":""}`} onClick={()=>this.setState({is_show_comments: !is_show_comments})}><span></span> {post.comments.length} Comment</button>
                                <button type="button" className="toggle_edit_button" onClick={()=>this.toggleEditForm(true, post.message)}><span></span>Edit</button>
                                <button type="button" className="toggle_delete_button" onClick={()=>this.setState({is_show_delete_modal: !is_show_delete_modal})}><span></span>Delete</button>
                            </div>
                            <p className="post_info">
                                <img src={user_icon} alt="user icon" />
                                <span>You</span><span>-</span><span>Few seconds ago</span>
                            </p>
                        </React.Fragment>
                        :
                        <form method="post" className="edit_form" onSubmit={event=>this.submitEdit(event, post.id)}>
                            <textarea name="edit_input" defaultValue={updated_message} onChange={event=>this.getMessage(event)}></textarea>
                            <button type="button" className="cancel_button" onClick={()=>this.toggleEditForm(false)}>Cancel</button>
                            <button type="submit" className={`submit_edit_button  ${!updated_message? "disabled":""}`}>Update Message</button>
                        </form>
                    }
                    {
                        is_show_comments &&
                        <React.Fragment>
                            <form method="post" className="comment_form" onSubmit={event=>this.submitComment(event, post.id, new_comment)}>
                                <textarea name="comment_input" value={new_comment} placeholder="Type your comment here." onChange={event=>this.getComment(event)}></textarea>
                                <button type="submit" className={`submit_comment_button ${!new_comment? "disabled":""}`}>Post Comment</button>
                            </form>
                            <ul className="comments">
                            {
                                post.comments.map(comment => 
                                    <Comment 
                                        key={comment.id} 
                                        message_id={post.id} 
                                        comment={comment}
                                        deleteComment={deleteComment} 
                                        editComment={editComment}/>
                                )

                            }
                            </ul>
                        </React.Fragment>
                    }
                </li>
                {
                    is_show_delete_modal &&
                    <DeleteMessageModal deleteMessage={deleteMessage} post_id={post.id} show={is_show_delete_modal} onHide={()=>this.setState({is_show_delete_modal: !is_show_delete_modal})}/>
                }
            </React.Fragment>
        )
    }
}

export default Message;