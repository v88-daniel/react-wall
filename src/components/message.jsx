import React, { Component } from 'react';
import Comment from './comment';
import './message.scss';
import user_icon from '../images/user_icon.png';
import DeleteMessageModal from './delete_message_modal';

class Message extends Component{
    state = {
        is_show_edit_form: false,
        is_show_comment_form: false,
        new_message: "",
        new_comment: "",
        is_show_delete_message_modal: false,
    }

    showCommentform = (is_show_comment_form) => this.setState({is_show_comment_form: !is_show_comment_form});

    toggleEditForm = (is_show, message = null) => this.setState({is_show_edit_form: is_show, new_message: message});

    closeEditForm = () => this.setState({is_show_edit_form: false, message_to_edit: null});

    getNewMessage = (new_message) => this.setState({new_message: new_message});

    updateMessage = (event, id) => {
        event.preventDefault();
        const { new_message } = this.state;
        if(new_message){
            this.props.updateMessage(id,new_message);
            this.setState({is_show_edit_form: false});
        }
    }

    getComment = (comment) => this.setState({new_comment: comment});

    submitComment = (message_id, event) => {
        event.preventDefault();
        const { new_comment } = this.state;
        if(new_comment){
            this.props.submitComment(message_id, new_comment);
            this.setState({new_comment: ""});
        }
    }

    showDeleteModal =(is_show_delete_message_modal) => this.setState({is_show_delete_message_modal: !is_show_delete_message_modal})

    render(){
        const { is_show_edit_form, is_show_comment_form, new_comment, new_message, is_show_delete_message_modal } = this.state;
        const { post, deleteMessage, updateComment, deleteComment } = this.props;

        const comment_count = post.comments.length;
        return(
            <li className="message">
                {
                    !is_show_edit_form ?
                    <React.Fragment>
                        <p className="text_content">{post.message}</p>
                        <div className="actions">
                            <button type="submit" className={`toggle_comment_button ${comment_count ? "has_comment":""}`} onClick={() => this.showCommentform(is_show_comment_form)}><span></span> {comment_count} Comment</button>
                            <button type="submit" className="toggle_edit_button" onClick={() => this.toggleEditForm(true, post.message)}><span></span> Edit</button>
                            <button type="submit" className="toggle_delete_button" onClick={() => this.showDeleteModal(is_show_delete_message_modal)}><span></span> Delete</button>
                        </div>
                        <div className="post_info">
                            <img src={user_icon} alt="User icon" />
                            <div className="posted_by">You</div> -
                            <div className="post_time">Few seconds ago</div>
                        </div>
                    </React.Fragment>
                    :
                    <form className="edit_form" onSubmit={(event) => this.updateMessage(event, post.id)}>
                        <textarea name="edit_input" defaultValue={new_message} onChange={(event) => this.getNewMessage(event.target.value)}></textarea>
                        <button type="button" className="cancel_button" onClick={() => this.toggleEditForm(false)}>Cancel</button>
                        <button type="submit" className={`submit_edit_button ${new_message ? "":"disabled"}`}>Update Message</button>
                    </form>
                }
                {
                    is_show_comment_form &&
                    <React.Fragment>
                        <form className="comment_form" onSubmit={event => this.submitComment(post.id, event)}>
                            <textarea name="comment_input" placeholder="Type your comment here" value={new_comment} onChange={event => this.getComment(event.target.value)}></textarea>
                            <button type="submit" className={`${new_comment ? "":"disabled"}`}>Post Comment</button>
                        </form>
                        <ul className="comments">
                            {
                                post.comments.map(comment => <Comment 
                                                                key={comment.id} 
                                                                message_id={post.id} 
                                                                comment={comment} 
                                                                deleteComment={deleteComment} 
                                                                updateComment={updateComment}/>)
                            }
                        </ul>
                    </React.Fragment>
                }
                {
                    is_show_delete_message_modal &&
                    <DeleteMessageModal
                        show={is_show_delete_message_modal}
                        onHide={() => this.setState({is_show_delete_message_modal: !is_show_delete_message_modal})}
                        deleteMessage={deleteMessage}
                        message_id={post.id}
                    />
                }
            </li>
        )
    }
}

export default Message;