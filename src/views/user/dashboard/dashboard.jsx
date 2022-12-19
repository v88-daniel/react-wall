/** React */
import React, { Component } from 'react';

/** Plugins */
import { Link }             from 'react-router-dom';

/** Components */
import Message              from './components/message';
import CreateMessageModal   from './modals/create_message_modal';
import DeleteMessageModal   from './modals/delete_message_modal';
import DeleteCommentModal   from './modals/delete_comment_modal';

/** CSS */
import './dashboard.scss';

/** Image */
import no_message_prompt    from '../../../assets/images/empty_message_icon.png';
import { generateID } from '../../../__helpers/helpers';

/**
 * @class
 * @extends Component
 * This component class is being called on App.js <br>
 * This component class shows the whole dashboard page. <br>
 * Last updated at: December 19, 2022
 */
class Dashboard extends Component{

    state = {
        posts: [],
        is_show_create_message_modal: false,
        message_to_delete: null,
        comment_to_delete: {comment_id: null, message_id: null}
    }

    /**
     * DOCU: Function to add message on state. <br>
     * Passed on the create message modal component. <br>
     * Last updated at: December 17, 2022
     * @function
     * @memberof Dashboard
     * @param {string} new_message Required. This is the 'message'. <br>
     * @author Daniel
     */
    createMessage = (new_message) => {
        let { posts } = this.state;
        posts = [{id: generateID(), message: new_message, comments: []}, ...posts];
        this.setState({posts, is_show_create_message_modal: false});
    }

    /**
     * DOCU: Function to delete message on state. <br>
     * Passed on the delete message modal component. <br>
     * Last updated at: December 17, 2022
     * @function
     * @memberof Dashboard
     * @param {number} message_id Required to target the message through its id. <br>
     * @author Daniel
     */
    deleteMessage = (message_id) => {
        let { posts } = this.state;
        posts = posts.filter(post => post.id !== message_id);
        this.setState({posts, message_to_delete: null});
    }

    /**
     * DOCU: Function to edit message on state. <br>
     * Passed on message component. <br>
     * Last updated at: December 17, 2022
     * @function
     * @memberof Dashboard
     * @param {number} message_id Required to target the message through its id. <br>
     * @param {string} updated_message Required. Edited message. <br>
     * @author Daniel
     */
    editMessage = (message_id, updated_message) => {
        let { posts } = this.state;
        const message = posts.find(post => post.id === message_id);
        message.message = updated_message;
        this.setState({posts});
    }

    /**
     * DOCU: Function to add comment on a specific message on state. <br>
     * Passed on message component to be used on comment component. <br>
     * Last updated at: December 17, 2022
     * @function
     * @memberof Dashboard
     * @param {number} message_id Required to target the message that will have the comment. <br>
     * @param {string} new_comment Required. <br>
     * @author Daniel
     */
    addComment = (message_id, new_comment) => {
        let { posts } = this.state;
        const message = posts.find(post => post.id === message_id);
        message.comments = [{id: generateID(), comment: new_comment}, ...message.comments];
        this.setState({posts});
    }

    /**
     * DOCU: Function to delete comment on a specific message on state. <br>
     * Passed on the delete comment modal component. <br>
     * Last updated at: December 17, 2022
     * @function
     * @memberof Dashboard
     * @param {number} comment_id Required to target the comment through its id <br>
     * @param {number} message_id Required to target the message that has the comment. <br>
     * @author Daniel
     */
    deleteComment = (comment_id, message_id) => {
        let { posts } = this.state;
        const message = posts.find(post => post.id === message_id);
        message.comments = message.comments.filter(comment => comment_id !== comment.id);
        this.setState({posts, comment_to_delete: {comment_id: null, message_id: null}});
    }

    /**
     * DOCU: Function to edit comment on a specific message on state. <br>
     * Passed on message component to be used on comment component. <br>
     * Last updated at: December 17, 2022
     * @function
     * @memberof Dashboard
     * @param {number} comment_id Required to target the comment through its id <br>
     * @param {number} message_id Required to target the message that has the comment. <br>
     * @param {string} updated_comment Required. <br>
     * @author Daniel
     */
    editComment = (message_id, comment_id, updated_comment) => {
        let { posts } = this.state;
        const message = posts.find(post => post.id === message_id);
        const comment = message.comments.find(comment => comment.id === comment_id);
        comment.comment = updated_comment;
        this.setState({posts});
    }

    render(){
        const { posts, is_show_create_message_modal, message_to_delete, comment_to_delete } = this.state;
        const { logout } = this.props
        return(
            <div id="dashboard">
                <nav>
                    <div className="custom_wrapper">
                        <Link id="logo">The Wall Assignment</Link>
                        <p id="user">Welcome, Daniel Renzal! <button id="logout" onClick={logout}>Logout</button></p>
                    </div>
                </nav>

                <div id="wall">
                    <header>
                        <p id="message_count"><strong>{posts.length}</strong> messages arranged by latest posted</p>
                        <button type="button" id="create_message_button" onClick={()=>this.setState({is_show_create_message_modal:!is_show_create_message_modal})}>Create Message</button>
                    </header>

                    <ul id="feed_list">
                        {
                            posts.length 
                        ?   posts.map(post => 
                                <Message 
                                    key={post.id} 
                                    post={post} 
                                    getMessageToDelete={(message_id)=>this.setState({message_to_delete: message_id})} 
                                    editMessage={this.editMessage} 
                                    getCommentToDelete={(comment_id, message_id)=>this.setState({comment_to_delete: {comment_id, message_id}})} 
                                    editComment={this.editComment} 
                                    addComment={this.addComment}
                                />
                            )
                        :   <p id="no_message_prompt">
                                <img src={no_message_prompt} alt="No messages" />
                                No Posted Message Yet.
                            </p>
                        }
                    </ul>
                </div>
                {
                    is_show_create_message_modal &&
                    <CreateMessageModal 
                        show={is_show_create_message_modal} 
                        onHide={()=>this.setState({is_show_create_message_modal: !is_show_create_message_modal})} 
                        createMessage={this.createMessage}
                    />
                }
                {
                    message_to_delete &&
                    <DeleteMessageModal 
                        show={message_to_delete} 
                        onHide={()=>this.setState({message_to_delete: null})} 
                        deleteMessage={this.deleteMessage} 
                        message_id={message_to_delete} 
                    />
                }
                {
                    comment_to_delete.comment_id &&
                    <DeleteCommentModal 
                        show={comment_to_delete.comment_id} 
                        onHide={()=>this.setState({comment_to_delete: {comment_id: null, message_id: null}})} 
                        deleteComment={this.deleteComment} 
                        comment_to_delete={comment_to_delete} 
                    />
                }
            </div>
        )
    }
}

export default Dashboard;