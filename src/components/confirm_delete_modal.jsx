import React, { Component } from 'react';

class ConfirmDeleteModal extends Component{
    render(){
        return(
            <form id="confirm_delete_modal">
                <button type="button" className="close_modal_button"></button>
                <h2>Confirm Delete Message</h2>
                <p>Are you sure you want to remove this message? This action cannot be undone.</p>
                <footer>
                    <button type="button" className="cancel_button">Cancel</button>
                    <button type="submit" className="remove_button">Yes, Remove it.</button>
                </footer>
            </form>
        )
    }
}

export default ConfirmDeleteModal;