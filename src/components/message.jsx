import React, { Component } from 'react';
import Comment from './comment';

class Message extends Component{
    render(){
        const { post } = this.props;
        return(
            <div className="message">
                <p className="text_content">{post.message}</p>
                <div className="actions">
                    <button type="submit">0 comment</button>
                    <button type="submit">edit</button>
                    <button type="submit">delete</button>
                </div>
                <div className="post_info">
                    <div className="posted_by">You</div> -
                    <div className="post_time">Few seconds ago</div>
                </div>
                <form className="edit_form">
                    <textarea name="edit_input"></textarea>
                    <button type="button">cancel</button>
                    <button type="submit">Update Message</button>
                </form>
                <form className="comment_form">
                    <textarea name="comment_input" placeholder="Type your comment here"></textarea>
                    <button type="submit">Post Comment</button>
                </form>
                <div className="comments">
                    {
                        post.comments.map(comment => <Comment comment={comment} key={comment.id}/>)
                    }
                </div>
            </div>
        )
    }
}

export default Message;