import React, { useState } from "react";
import Modal from "react-modal";
import "../assets/styles/components/RatingPopUp.css";
import RedX from "../assets/images/red_x.png";
import StarFilled from "../assets/images/star_filled.png";
import StarUnfilled from "../assets/images/star_unfilled.png";

const RatingPopup = ({ title }) => {
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [filledStars, setFilledStars] = useState(0);

	const openModal = () => {
		setModalIsOpen(true);
	};

	const closeModal = () => {
		setFilledStars(0);
		setModalIsOpen(false);
	};

	const handleStarClick = (index) => {
		// Check if the last star that is StarFilled is clicked
		if (index === filledStars - 1) {
			setFilledStars(0); // Reset all stars to StarUnfilled
		} else {
			setFilledStars(index + 1); // Update the number of filled stars
		}
	};

	const handleRateSubmit = () => {
		if (filledStars > 0) {
			console.log(`Number of filled stars: ${filledStars}`);
			closeModal();
		} else {
			console.log(`Must make a rating before submitting`);
		}
	};

	Modal.setAppElement("#root");

	return (
		<div>
			<h5 className="MovieUserRate" onClick={openModal}>
				Rate
			</h5>
			<Modal
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
				contentLabel={`Rating Popup for ${title}`}
				className="RatingModal"
				overlayClassName="overlay">
				<div className="RatingPopUp">
					<img
						className="MovieSymbol CloseRatingSymbol"
						src={RedX}
						alt="close"
						width={25}
						height={25}
						onClick={closeModal}
					/>
					<div className="RatingStarQuestion">
						<img
							className="MovieSymbol"
							src={StarFilled}
							alt="star"
							width={100}
							height={95}
						/>
						<h2 className="QuestionMark">?</h2>
					</div>
					<h2 className="RatingTitle">{title}</h2>
					<div className="RatingStarChoice">
						{Array(5)
							.fill(null)
							.map((_, index) => (
								<img
									key={index}
									className="MovieSymbol RatingStar"
									src={index < filledStars ? StarFilled : StarUnfilled}
									alt={index < filledStars ? "star-filled" : "star-unfilled"}
									width={40}
									height={38}
									onClick={() => handleStarClick(index)}
								/>
							))}
					</div>
					<button className="Button RatingButton" onClick={handleRateSubmit}>
						Rate
					</button>
				</div>
			</Modal>
		</div>
	);
};

export default RatingPopup;
