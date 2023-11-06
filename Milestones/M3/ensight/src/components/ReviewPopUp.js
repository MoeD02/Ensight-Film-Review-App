import React, { useState } from 'react';
import Modal from 'react-modal';

const ReviewPopup = () => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleReviewSubmit = () => {
        // Implement logic to handle the submitted review (e.g., send it to a server)
        console.log('Submitted Review:', { rating, comment });
        // Close the modal after submitting
        closeModal();
    };

    return (
        <div>
            <button onClick={openModal}>Leave a Review</button>
            <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Review Popup"
            >
                <h2>Leave a Review</h2>
                <label>
                    Rating:
                    <input
                    type="number"
                    min="1"
                    max="5"
                    value={rating}
                    onChange={(e) => setRating(parseInt(e.target.value, 10))}
                    required
                    />
                </label>
                <br />
                <label>
                    Comment:
                    <textarea
                    rows="4"
                    cols="50"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Type your review here..."
                    required
                    ></textarea>
                </label>
                <br />
                <button onClick={handleReviewSubmit}>Submit Review</button>
                <button onClick={closeModal}>Cancel</button>
            </Modal>
        </div>
    );
};

export default ReviewPopup;