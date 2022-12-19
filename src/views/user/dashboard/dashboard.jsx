import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Message from './components/message';
import no_message_prompt from '../../../assets/images/empty_message_icon.png';
import './dashboard.scss';
import CreateMessageModal from './modals/create_message_modal';

class Dashboard extends Component{

    state = {
        posts: [],
        is_show_create_message_modal: false
    }

    createMessage = (new_message) => {
        let { posts } = this.state;
        const message_id = posts.length? posts[0].id + 1:1;
        posts = [{id: message_id, message: new_message, comments: []}, ...posts];

        this.setState({posts, is_show_create_message_modal: false});
    }

    deleteMessage = (message_id) => {
        const { posts } = this.state;
        const new_posts = posts.filter(post => post.id !== message_id);
        this.setState({posts: new_posts});
    }

    editMessage = (message_id, updated_message) => {
        const { posts } = this.state;
        const new_posts = posts.map(post => {
            if(post.id === message_id){
                post.message = updated_message;
            }

            return post;
        })

        this.setState({posts: new_posts});
    }

    addComment = (message_id, new_comment) => {
        let { posts } = this.state;
        posts.forEach(post => {
            if(post.id === message_id){
                const comment_id = post.comments.length? post.comments[0].id + 1:1;
                post.comments = [{id: comment_id, comment: new_comment}, ...post.comments];
            }
        });
    
        this.setState({posts});
    }

    deleteComment = (comment_id, message_id) => {
        const { posts } = this.state;
        const new_posts = posts.map(post => {
            if(post.id === message_id){
                post.comments = post.comments.filter(comment => comment_id !== comment.id);
            }

            return post;
        })

        this.setState({posts: new_posts});
    }

    editComment = (message_id, comment_id, updated_comment) => {
        const { posts } = this.state;
        const new_posts = posts.map(post => {
            if(post.id === message_id){
                const comments = post.comments.find(comment => comment.id === comment_id);
                comments.comment = updated_comment;
            }
            return post;
        })

        this.setState({posts: new_posts});
    }

    render(){
        const { posts, is_show_create_message_modal } = this.state;
        return(
            <div id="dashboard">
                <nav>
                    <div className="custom_wrapper">
                        <Link id="logo">The Wall Assignment</Link>
                        <p id="user">Welcome, Daniel Renzal! <button id="logout" onClick={this.props.logout}>Logout</button></p>
                    </div>
                </nav>

                <div id="wall">
                    <header>
                        <p id="message_count"><strong>{posts.length}</strong> messages arranged by latest posted</p>
                        <button type="button" id="create_message_button" onClick={()=>this.setState({is_show_create_message_modal:!is_show_create_message_modal})}>Create Message</button>
                    </header>

                    <ul id="feed">
                        {
                            posts.length ?
                            posts.map(post => 
                                <Message 
                                    key={post.id} 
                                    post={post} 
                                    deleteMessage={this.deleteMessage} 
                                    editMessage={this.editMessage} 
                                    deleteComment={this.deleteComment} 
                                    editComment={this.editComment} 
                                    addComment={this.addComment}/>
                            )
                            :
                            <p id="no_message_prompt">
                                <img src={no_message_prompt} alt="No messages" />
                                No Posted Message Yet.
                            </p>
                        }
                    </ul>
                </div>
                <CreateMessageModal 
                    show={is_show_create_message_modal} 
                    onHide={()=>this.setState({is_show_create_message_modal: !is_show_create_message_modal})} 
                    createMessage={this.createMessage}/>
            </div>
        )
    }
}

export default Dashboard;