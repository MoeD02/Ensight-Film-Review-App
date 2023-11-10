import { useState, useEffect } from 'react';
import '../assets/styles/components/PosterCarousel.css';

// Import the poster images here
import poster1 from '../assets/images/image-11@2x.png';
import poster2 from '../assets/images/image-14@2x.png';
import poster3 from '../assets/images/image-10@2x.png';
import poster4 from '../assets/images/image-101@2x.png';
import poster5 from '../assets/images/image-102@2x.png';

function PosterCarousel() {
  const [currentIndex, setCurrentIndex] = useState(1); // Start at index 1 (first original poster)

  const posters = [poster1, poster2, poster3, poster4, poster5];

  const extendedPosters = [posters[posters.length - 1], ...posters, posters[0]];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentIndex === extendedPosters.length - 1) {
      setTimeout(() => {
        setCurrentIndex(1); // Jump back to the first original poster
      }, 50);
    } else if (currentIndex === 0) {
      setTimeout(() => {
        setCurrentIndex(extendedPosters.length - 2); // Jump back to the last original poster
      }, 50);
    }
  }, [currentIndex, extendedPosters.length]);

  return (
    <div className="carousel">
      <div
        className="posters"
        style={{ transform: `translateX(-${currentIndex * 100}%)`, transition: currentIndex === 0 || currentIndex === extendedPosters.length - 1 ? 'none' : '' }}
      >
        {extendedPosters.map((poster, index) => (
          <img
            key={poster}
            src={poster}
            alt={`Poster ${index}`}
            style={{ width: "100%", height: "100%", objectFit: 'cover' }}
            />
        ))}
      </div>
    </div>
  );
}

export default PosterCarousel;
