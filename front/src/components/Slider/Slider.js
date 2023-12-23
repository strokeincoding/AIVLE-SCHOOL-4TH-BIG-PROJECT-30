import React, { useState, useEffect } from 'react';
import './Slider.css'; // Make sure your CSS is properly set up

const Slider = ({ images }) => {
  const [current, setCurrent] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);

  // This effect runs when `current` changes.
  useEffect(() => {
    // If we're at the first or last image, we want to jump to the first/last image without transition.
    if (!isTransitioning) {
      const timeoutId = setTimeout(() => {
        setIsTransitioning(true);
      }, 0); // Timeout ensures this is run after the browser paints

      return () => clearTimeout(timeoutId);
    }
  }, [current, isTransitioning]);

  const goToSlide = (index, transition = true) => {
    setIsTransitioning(transition);
    setCurrent(index);
  };

  const onPrevClick = () => {
    if (current <= 1) {
      goToSlide(images.length - 1, false);
    } else {
      goToSlide(current - 1);
    }
  };

  const onNextClick = () => {
    if (current >= images.length - 1) {
      goToSlide(1, false);
    } else {
      goToSlide(current + 1);
    }
  };

  return (
    <div className="slider-container">
      <button className="leftBtn" onClick={onPrevClick}>&lt;</button>
      <div className="slider">
        {images.map((img, index) => (
          <div
            key={index}
            className={`slide ${index === current ? 'active' : ''}`}
            style={{ 
              transform: `translateX(${-100 * current}%)`,
              transition: isTransitioning ? 'transform 400ms ease-in-out' : 'none'
            }}
          >
            <img src={img.src} alt={img.alt} />
          </div>
        ))}
      </div>
      <button className="rightBtn" onClick={onNextClick}>&gt;</button>
    </div>
  );
};

export default Slider;
