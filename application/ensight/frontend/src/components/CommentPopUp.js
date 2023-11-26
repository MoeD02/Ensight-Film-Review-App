import React, { useState } from 'react';
import Modal from 'react-modal';
import '../assets/styles/components/ReviewPopUp.css'
import RedX from '../assets/images/red_x.png'

const ReviewPopup = ({ title }) => {
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
        console.log('Submitted Review:', { comment });
        // Close the modal after submitting
        closeModal();
    };

    Modal.setAppElement('#root');

    return (
        <div>
            <button className="create-list-button custom-button" onClick={openModal}>Write a Comment</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel={`Comment Popup for ${title}`}
                className="ReviewModal"
                overlayClassName="overlay"
            >
                <div className='ReviewPopUp'>
                    <img className="MovieSymbol CloseSymbol" src={RedX} alt="close" width={30} height={30} onClick={closeModal}/>
                    <div className='ReviewMain'>
                        <div className='ReviewContent'>
                            <h2 className='ReviewStatement'>Your Comment for</h2>
                            <h2 className='ReviewTitle'>{title}</h2>
                        </div>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Type your comment here..."
                            required
                            className='ReviewTextInput'
                        />
                        <button className="Button ReviewButton" onClick={handleReviewSubmit}>Submit Review</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default ReviewPopup;
