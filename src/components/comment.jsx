import React, { Component } from 'react';

class Comment extends Component{
    render(){
        const { comment } = this.props;
        return(
            <div className="comment">
                <p className="text_content">{comment.comment}</p>
                <div className="actions">
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
                    <button type="submit">Update Comment</button>
                </form>
            </div>
        )
    }
}

export default Comment;