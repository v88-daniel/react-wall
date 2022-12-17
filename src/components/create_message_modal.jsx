import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import './create_message_modal.scss';

class CreateMessageModal extends Component{

    state = {
        new_message: ""
    }

    submitMessage = (event) => {
        event.preventDefault();
        const { new_message } = this.state;
        if(new_message){
            this.props.createMessage(new_message);
            this.setState({new_message: ""});
        }
    }

    render(){
        const { new_message } = this.state;
        const { show, onHide } = this.props;
        return(
            <Modal show={show} onHide={onHide} centered id="create_message_modal">
                <Modal.Header closeButton>
                    <Modal.Title>Create a Message</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form method="post" onSubmit={event=>this.submitMessage(event)}>
                        <textarea name="message_input" placeholder="Type your message here." onChange={(event)=>this.setState({new_message: event.target.value})}></textarea>
                        <button type="button" className="cancel_button" onClick={onHide}>Cancel</button>
                        <button type="submit" className={`submit_message_button ${!new_message? "disabled":""}`}>Post Message</button>
                    </form>
                </Modal.Body>

            </Modal>
        )
    }
}

export default CreateMessageModal;