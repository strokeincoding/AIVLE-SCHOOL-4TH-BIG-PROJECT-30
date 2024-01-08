import React, { useState, useEffect } from 'react';
import './Slider.css'; // Make sure your CSS is properly set up
 
const Slider = ({ images }) => {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
 
  // This effect runs when `current` changes.
  useEffect(() => {
    if (!isTransitioning) {
      setIsTransitioning(true);
    }
  }, [current]); // Removed isTransitioning from dependency array
 
  const goToSlide = (index, transition = true) => {
    setCurrent(index); // First, update the current slide
    // Then, after the current slide has been updated, set isTransitioning
    setTimeout(() => setIsTransitioning(transition), 0);
  };
 
  const onPrevClick = () => {
    if (current === 0) {
      goToSlide(images.length - 3, false); // Go to the last image without transition
    } else {
      goToSlide(current - 1); // Go to the previous image with transition
    }
  };
 
  const onNextClick = () => {
    if (current === images.length - 3) {
      goToSlide(0, false); // Go to the first image without transition
    } else {
      goToSlide(current + 1); // Go to the next image with transition
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
            {img.content}
          </div>
        ))}
      </div>
      <button className="rightBtn" onClick={onNextClick}>&gt;</button>
    </div>
  );
};
export default Slider;
 