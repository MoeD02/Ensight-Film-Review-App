import React, { useRef, useEffect, useState } from "react";
import "../assets/styles/components/ProfileTabs.css";

const SlideIn = ({ children, startAnimation }) => {
	const containerRef = useRef(null);
	const [contentHeight, setContentHeight] = useState(0);

	useEffect(() => {
		if (startAnimation) {
			const contentElement = containerRef.current.firstChild; // Assuming the first child is the content
			const height = contentElement ? contentElement.scrollHeight : 0;
			setContentHeight(height);
		} else {
			setContentHeight(0);
		}
	}, [startAnimation]);

	const transitionProperties = {
		height: startAnimation ? `${contentHeight}px` : "175px",
		marginTop: startAnimation ? "0" : "-175px",
	};

	console.log(contentHeight);

	return (
		<div className="slide-in" style={transitionProperties} ref={containerRef}>
			{children}
		</div>
	);
};

export default SlideIn;
