import React, { useState, useEffect } from 'react';
import './Slider.css';
 
const Slider = ({ images }) => {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
 
  useEffect(() => {
    if (!isTransitioning) {
      setIsTransitioning(true);
    }
  }, [current,isTransitioning]); 
 
  const goToSlide = (index, transition = true) => {
    setCurrent(index); 
    setTimeout(() => setIsTransitioning(transition), 0);
  };
 
  const onPrevClick = () => {
    if (current === 0) {
      goToSlide(images.length - 3, false); 
    } else {
      goToSlide(current - 1); 
    }
  };
 
  const onNextClick = () => {
    if (current === images.length - 3) {
      goToSlide(0, false); 
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
            {img.content}
          </div>
        ))}
      </div>
      <button className="rightBtn" onClick={onNextClick}>&gt;</button>
    </div>
  );
};
export default Slider;
 