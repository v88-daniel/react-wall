/** React */
import React, { Component } from 'react';

/** Components */
import Comment              from './comment';

/** Image */
import user_icon            from '../../../../assets/images/user_icon.png';

/** CSS */
import './message.scss'

/**
 * @class
 * @extends Component
 * This component class is being called on dashboard.jsx <br>
 * This component class shows a single message together its comments. <br>
 * Last updated at: December 19, 2022
 */
class Message extends Component{

    state = {
        is_show_edit_form: false,
        is_show_comments: false,
        updated_message: "",
        new_comment: ""
    }

    /**
     * DOCU: Function to toggle the edit form <br>
     * Triggered on render() <br>
     * Last updated at: December 19, 2022
     * @function
     * @memberof Message
     * @param {boolean} is_show Required. The visibility of the form depends on this value. <br> 
     * @param {string=} message Optional. Pass a value if form will be shown (to place a value to its textarea). <br>
     * @author Daniel
     */
    toggleEditForm = (is_show, message = "") => {
        this.setState({is_show_edit_form: is_show, updated_message: message})
    }

    /**
     * DOCU: Function to get the text that is being typed on the form (then pass it to the state) <br>
     * Triggered on render() <br>
     * Last updated at: December 19, 2022
     * @function
     * @memberof Message
     * @param {object} event Required to get the value from its target property. <br> 
     * @author Daniel
     */
    getMessage = (event) => {
        this.setState({updated_message: event.target.value});
    }

    /**
     * DOCU: Executes the process of getting the updated message then passing it to the editMessage method. Then hides the form. <br>
     * Triggered on render() <br>
     * Last updated at: December 19, 2022
     * @function
     * @memberof Message
     * @param {object} event Required to call the preventDefault method. <br> 
     * @param {number} message_id Required to target the message that will be edited. <br> 
     * @author Daniel
     */
    submitEdit = (event, message_id) => {
        event.preventDefault();
        const { updated_message } = this.state;
        if(updated_message){
            this.props.editMessage(message_id, updated_message);
            this.setState({is_show_edit_form: false});
        }
    }

    /**
     * DOCU: Gets the value from the comment from then pass it on state. <br>
     * Triggered on render() <br>
     * Last updated at: December 19, 2022
     * @function
     * @memberof Message
     * @param {object} event Required to get the value from the target property. <br> 
     * @author Daniel
     */
    getComment = (event) => {
        this.setState({new_comment: event.target.value});
    }

    /**
     * DOCU: Executes the process of getting the new comment then passing it to the addComment method. Then empties the new_comment state. <br>
     * Triggered on render() <br>
     * Last updated at: December 19, 2022
     * @function
     * @memberof Message
     * @param {object} event Required to call the preventDefault method. <br> 
     * @param {number} message_id Required to target the message that will have the comment. <br> 
     * @param {string} new_comment Required. <br> 
     * @author Daniel
     */
    submitComment = (event, message_id, new_comment) => {
        event.preventDefault();
        if(new_comment){
            this.props.addComment(message_id, new_comment);
            this.setState({new_comment: ""});
        }
    }

    render(){
        const { is_show_edit_form, is_show_comments, updated_message, new_comment } = this.state;
        const { post, getMessageToDelete, getCommentToDelete, editComment } = this.props;
        return(
            <React.Fragment>
                <li className="message">
                    {
                        !is_show_edit_form 
                        ?   <React.Fragment>
                                <p className="text">{post.message}</p>
                                <div className="actions">
                                    <button type="button" className={`toggle_comment_button ${post.comments.length && "has_comment"}`} onClick={()=>this.setState({is_show_comments: !is_show_comments})}><span></span> {post.comments.length} Comment</button>
                                    <button type="button" className="toggle_edit_button" onClick={()=>this.toggleEditForm(true, post.message)}><span></span>Edit</button>
                                    <button type="button" className="toggle_delete_button" onClick={()=>getMessageToDelete(post.id)}><span></span>Delete</button>
                                </div>
                                <p className="post_info">
                                    <img src={user_icon} alt="user icon" />
                                    <span>You</span><span>-</span><span>Few seconds ago</span>
                                </p>
                            </React.Fragment>
                        :   <form method="post" className="edit_form" onSubmit={event=>this.submitEdit(event, post.id)}>
                                <textarea name="edit_input" defaultValue={updated_message} onChange={event=>this.getMessage(event)}></textarea>
                                <button type="button" className="cancel_button" onClick={()=>this.toggleEditForm(false)}>Cancel</button>
                                <button type="submit" className={`submit_edit_button  ${!updated_message && "disabled"}`}>Update Message</button>
                            </form>
                    }
                    {
                        is_show_comments &&
                        <React.Fragment>
                            <form method="post" className="comment_form" onSubmit={event=>this.submitComment(event, post.id, new_comment)}>
                                <textarea name="comment_input" value={new_comment} placeholder="Type your comment here." onChange={event=>this.getComment(event)}></textarea>
                                <button type="submit" className={`submit_comment_button ${!new_comment && "disabled"}`}>Post Comment</button>
                            </form>
                            <ul className="comments">
                                {
                                    post.comments.map(comment => 
                                        <Comment 
                                            key={comment.id} 
                                            message_id={post.id} 
                                            comment={comment}
                                            getCommentToDelete={getCommentToDelete} 
                                            editComment={editComment}
                                        />
                                    )
                                }
                            </ul>
                        </React.Fragment>
                    }
                </li>
            </React.Fragment>
        )
    }
}

export default Message;