import React, { useState, useEffect } from 'react';
import '../assets/styles/components/IntroFeed.css';

import movieImage1 from '../assets/images/download.png'; 
import movieImage2 from '../assets/images/download (1).png';
import movieImage3 from '../assets/images/download (2).png';
import movieImage4 from '../assets/images/download (3).png';
import movieImage5 from '../assets/images/download (4).png';
import movieImage6 from '../assets/images/download (5).png';

const movieImages = [movieImage1, movieImage2, movieImage3, movieImage4, movieImage5, movieImage6];

const IntroFeed = () => {
    const [offset, setOffset] = useState(100 * (movieImages.length - 1)); // Start at the end of the 1st set
    const [transitionEnabled, setTransitionEnabled] = useState(true); // To control CSS transitions

    useEffect(() => {
        const slide = () => {
            setOffset(prevOffset => {
                if (prevOffset <= 0) {
                    // Disable transition and reset to the end of the 1st set
                    setTransitionEnabled(false);
                    return 100 * (movieImages.length - 1);
                } else if (!transitionEnabled) {
                    // If transitioning is currently off, turn it back on
                    setTransitionEnabled(true);
                }
                return prevOffset - 1; // Move to the previous image
            });
        };
        
        const interval = setInterval(slide, 50);
        return () => clearInterval(interval);
    }, [transitionEnabled]);    

    return (
        <div className="slider">
            <div 
                className="slides" 
                style={{
                    transform: `translateX(-${offset}%)`,
                    transition: transitionEnabled ? 'transform 50ms linear' : 'none'
                }}
            >
                {/* Double the image set to achieve the seamless loop */}
                {movieImages.concat(movieImages).map((src, index) => (
                    <img
                        key={index}
                        className="slide"
                        src={src}
                        alt=""
                    />
                ))}
            </div>
        </div>
    );
}



export default IntroFeed;
