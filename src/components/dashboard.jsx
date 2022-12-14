import React, { Component } from 'react';
import Message from './message';
import './dashboard.scss';
import CreateMessageModal from './create_message_modal';
import no_message_prompt from '../images/empty_message_icon.png';

class Dashboard extends Component{
    state = {
        posts: [],
        is_show_create_message_modal: false,
    }

    submitMessage = (message) => {
        let { posts } = this.state;
        const id = posts.length ? posts[0].id + 1:1;
        posts = [{id: id, message: message, comments: []}, ...posts];
        this.setState({posts: posts});

    }

    updateMessage = (id, new_message) => {
        const { posts } = this.state;
        const post = posts.find(post => post.id === id);
        post.message = new_message;
    }

    deleteMessage = (id) => {
        const { posts } = this.state;
        const new_posts = posts.filter(post => post.id !== id);
        this.setState({posts: new_posts});
    }

    submitComment = (message_id, comment) => {
        const { posts } = this.state;
        const post = posts.find(post => post.id === message_id);
        const comment_id = post.comments.length ? (post.comments[0].id + 1):1;
        post.comments = [{id: comment_id, comment}, ...post.comments];
        this.setState({posts: posts});
    }

    updateComment = (message_id, comment_id, updated_comment) => {
        const { posts } = this.state;
        const new_posts = posts.map(post => {
            if(post.id === message_id){
                const comment = post.comments.find(comment => comment.id === comment_id);
                comment.comment = updated_comment;
            }

            return post;
        })

        this.setState({posts: new_posts});
    }

    deleteComment = (message_id, comment_id) => {
        const { posts } = this.state;
        const new_posts = posts.map(post => {
            if(post.id === message_id){
                post.comments = post.comments.filter(comment => comment.id !== comment_id);
            }

            return post;
        });

        this.setState({posts: new_posts});  
    }

    render(){
        const { posts, is_show_create_message_modal } = this.state;
        return(
            <React.Fragment>
                <div id="dashboard">
                    <nav>
                        <div className="custom_wrapper">
                            <a href="#" id="logo">The Wall Assignment</a>
                            <p id="user">Welcome, Daniel Renzal! <a href="#">Logout</a></p>
                        </div>
                    </nav>
                    <div id="wall">
                        <header>
                            <div id="message_count"><strong>{posts.length}</strong> messages arranged by latest posted</div>
                            <button id="create_message_button" onClick={() => this.setState({is_show_create_message_modal: !is_show_create_message_modal})}>Create Message</button>
                        </header>
                        <ul id="feed">
                            {
                                posts.length ?
                                posts.map(post => <Message 
                                                    post={post} 
                                                    key={post.id} 
                                                    updateMessage={this.updateMessage} 
                                                    deleteMessage={this.deleteMessage}
                                                    submitComment={this.submitComment}
                                                    updateComment={this.updateComment}
                                                    deleteComment={this.deleteComment}
                                                />)
                                :
                                <p id="no_message_prompt">
                                    <img src={no_message_prompt} alt="No messages" />
                                    No posted message yet
                                </p>
                            }
                        </ul>
                    </div>
                </div>
                {
                    is_show_create_message_modal &&
                    <CreateMessageModal 
                        show={is_show_create_message_modal} 
                        onHide={() => this.setState({is_show_create_message_modal: !is_show_create_message_modal})}
                        submitMessage={this.submitMessage}/>
                }
            </React.Fragment>
        )
    }
}

export default Dashboard;