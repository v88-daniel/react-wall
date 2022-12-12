import React, { Component } from 'react';
import Message from './message';

class Dashboard extends Component{
    state = {
        posts: [
            {
                id: 1,
                message: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatum id ipsam eum quasi placeat quos magnam atque veniam porro veritatis!",
                comments: [
                    {id: 1, comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, laudantium?"},
                    {id: 2, comment: "Optio maxime ipsum nam praesentium assumenda tenetur perspiciatis! Harum odit quibusdam adipisci dolore neque assumenda, vitae magnam impedit quia."}
                ]
            },
            {
                id: 2,
                message: "Consequatur, numquam sequi excepturi quasi corporis necessitatibus voluptatum, modi fugiat architecto qui similique! Id, consectetur?",
                comments: [
                    {id: 1, comment: "Tempore amet dolorem voluptatem cumque molestiae aperiam similique assumenda maiores alias optio repellat culpa temporibus id."},
                    {id: 2, comment: "Deleniti, rerum natus."},
                    {id: 3, comment: "Similique cupiditate quis doloremque consequuntur vitae laborum sint impedit."}
                ]
            },
            {
                id: 3,
                message: "Ipsum quisquam provident, suscipit voluptatibus vel voluptas officiis ipsa.",
                comments: [
                    {id: 1, comment: "Aperiam error tempore eius odio maiores ratione quibusdam placeat facere tempora optio."}
                ]
            }
        ]
    }

    render(){
        const { posts } = this.state;
        return(
            <div id="dashboard">
                <nav>
                    <a href="#" id="logo">The Wall Assignment</a>
                    <p id="user">Welcome, Daniel Renzal! <a href="#">Logout</a></p>
                </nav>
                <div id="wall">
                    <header>
                        <div id="message_count"><strong>0</strong> messages arranged by latest posted</div>
                        <button id="create_message_button">Create Message</button>
                    </header>
                    <div id="feed">
                        {
                            posts.map(post => <Message post={post} key={post.id}/>)
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard;