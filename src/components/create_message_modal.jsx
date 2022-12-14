import React,{ Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import './create_message_modal.scss';

class CreateMessageModal extends Component{

    state = {
        new_message: null
    }

    getMessage = message => this.setState({new_message: message});

    submitMessage = event => {
        event.preventDefault();
        const { new_message } = this.state;
        if(new_message){
            this.props.submitMessage(new_message);
            this.props.onHide();
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
                    <form onSubmit={(event) => this.submitMessage(event)}>
                        <textarea name="create_message_input" placeholder="Type your message here." onChange={(event) => this.getMessage(event.target.value)}></textarea>
                        <button className="cancel_button" onClick={onHide}>Cancel</button>
                        <button id="post_message_button" className={`${new_message ? "":"disabled"}`}>Post Message</button>
                    </form>
                </Modal.Body>
            </Modal>
        )
    }
}

export default CreateMessageModal;