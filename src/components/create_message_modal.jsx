import React,{ Component } from 'react';

class CreateMessageModal extends Component{
    render(){
        return(
            <div className="modal_backdrop">
                <form id="create_message_modal">
                    <button className="close_modal_button"></button>
                    <h2>Create a Message</h2>
                    <textarea name="create_message_input" placeholder="Type your message here."></textarea>
                    <footer>
                        <button className="cancel_button">Cancel</button>
                        <button id="post_message_button">Post Message</button>
                    </footer>
                </form>
            </div>
        )
    }
}

export default CreateMessageModal;