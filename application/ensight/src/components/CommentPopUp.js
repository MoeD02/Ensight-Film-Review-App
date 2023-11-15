import React, { useState } from 'react';
import Modal from 'react-modal';
import '../assets/styles/components/CommentList.css'

const CommentBox = () => {
    const [comment, setComment] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
    setModalIsOpen(true);
    };

    const closeModal = () => {
    setModalIsOpen(false);
    };

    const handleCommentSubmit = () => {
        // Implement logic to handle the submitted comment (e.g., send it to a server)
        console.log('Submitted Comment:', comment);
        // Close the modal after submitting
        closeModal();
    };


    return (
        <div>
            <button onClick={openModal}>Leave a Comment</button>
            <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Comment Box"
            >
                <h2>Leave a Comment</h2>
                <textarea
                rows="4"
                cols="50"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Type your comment here..."
                ></textarea>
                <br />
                <button onClick={handleCommentSubmit}>Submit Comment</button>
                <button onClick={closeModal}>Cancel</button>
            </Modal>
        </div>
    );
};


export default CommentBox;