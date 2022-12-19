/** React */
import React, { Component } from 'react';

/** Image */
import user_icon            from '../../../../assets/images/user_icon.png';

/**
 * @class
 * @extends Component
 * This component class is being called on message.jsx <br>
 * This component class shows a single comment. <br>
 * Last updated at: December 19, 2022
 */
class Comment extends Component{

    state = {
        is_show_edit_form: false,
        updated_comment: null,
    }

    /**
     * DOCU: Gets the value from the edit comment from then pass it on state. <br>
     * Triggered on render() <br>
     * Last updated at: December 19, 2022
     * @function
     * @memberof Comment
     * @param {object} event Required to get the value from the target property. <br> 
     * @author Daniel
     */
    getComment = (event) => {
        this.setState({updated_comment: event.target.value});
    }

    /**
     * DOCU: Toggles the visibility of the edit form through a state value. <br>
     * Triggered on render() <br>
     * Last updated at: December 19, 2022
     * @function
     * @memberof Comment
     * @param {boolean} is_show Required. The visibility will base on this value. <br> 
     * @param {string=} comment Optional. Pass a value if form needs to be shown(to display the value to its textarea). <br> 
     * @author Daniel
     */
    toggleEditForm = (is_show, comment = null) => {
        this.setState({updated_comment: comment, is_show_edit_form: is_show});
    }

    /**
     * DOCU: Executes the process of getting the edited comment then passing it to the editComment method. Then closes the form. <br>
     * Triggered on render() <br>
     * Last updated at: December 19, 2022
     * @function
     * @memberof Comment
     * @param {object} event Required to call the preventDefault method. <br> 
     * @param {number} message_id Required to target the message that has the comment that will be edited. <br> 
     * @param {number} comment_id Required to target the comment that will be edited. <br> 
     * @author Daniel
     */
    submitEdit = (event, message_id, comment_id) => {
        event.preventDefault();
        const { updated_comment } = this.state;
        if(updated_comment){
            this.props.editComment(message_id, comment_id, updated_comment);
            this.setState({is_show_edit_form: false});
        }
    }

    render(){
        const { updated_comment, is_show_edit_form } = this.state;
        const { comment, message_id, getCommentToDelete } = this.props;

        return(
            <React.Fragment>
                <li className="comment">
                    {
                        !is_show_edit_form 
                        ?   <React.Fragment>
                                <p className="text">{comment.comment}</p>
                                <div className="actions">
                                    <button type="button" className="toggle_edit_button" onClick={()=>this.toggleEditForm(true, comment.comment)}><span></span>Edit</button>
                                    <button type="button" className="toggle_delete_button" onClick={()=>getCommentToDelete(comment.id, message_id)}><span></span>Delete</button>
                                </div>
                                <p className="post_info">
                                    <img src={user_icon} alt="user icon" />
                                    <span>You</span><span>-</span><span>Few seconds ago</span>
                                </p>
                            </React.Fragment>
                        :   <form className="edit_form" method="post" onSubmit={event=>this.submitEdit(event, message_id, comment.id)}>
                                <textarea name="edit_input" defaultValue={updated_comment} onChange={event=>this.getComment(event)}></textarea>
                                <button type="button" className="cancel_button" onClick={()=>this.toggleEditForm(false)}>Cancel</button>
                                <button type="submit" className={`submit_edit_button  ${!updated_comment && "disabled"}`}>Update Comment</button>
                            </form>
                    }
                </li>
            </React.Fragment>
        )
    }
}

export default Comment;