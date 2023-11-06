import React, { useState, useEffect } from 'react';
import '../assets/styles/components/IntroMovie.css';

import movieImage1 from '../assets/images/avatar.png'; 
import movieImage2 from '../assets/images/mario.png';
import movieImage3 from '../assets/images/mermaid.png';
import movieImage4 from '../assets/images/spiderman.png';
import movieImage5 from '../assets/images/suzume.png';

const movieImages = [movieImage1, movieImage2, movieImage3, movieImage4, movieImage5];

const IntroMovie = () => {
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const slide = () => {
            setOffset(prevOffset => {
                // If offset reaches the total width of all original images or goes beyond, reset to just before the first image
                if (prevOffset < -100 * (movieImages.length - 1)) {
                    return -100; // Reset to just before the first image (assuming the first image is duplicated at the end)
                }
                return prevOffset - 1; // Move to the next image
            });
        };
        
        const interval = setInterval(slide, 50);
        return () => clearInterval(interval);
    }, []);    

    return (
        <div className="slider">
            <div 
                className="slides" 
                style={{ transform: `translateX(${offset}%)` }}
            >
                {/* Double the array for seamless loop effect */}
                {movieImages.concat(movieImages).map((src, index) => (
                    <img
                        key={src}
                        className="slide"
                        src={src}
                        alt=""
                    />
                ))}
            </div>
        </div>
    );
}

export default IntroMovie;
