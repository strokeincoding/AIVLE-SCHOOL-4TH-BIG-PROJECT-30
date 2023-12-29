import React from 'react'
import './Card.css';



const Card = ({ title, text, buttonText, imagePath }) => {
  return (
    <div className="card">
      <div className="card-image-wrapper">
        <img src={imagePath} alt={title} className="card-image" /> {/* 이미지 경로를 props에서 받음 */}
      </div>
      <div className="card-content">
        <h2 className="card-title">{title}</h2> {/* 제목을 props에서 받음 */}
        <p className="card-text">
          {text} {/* 텍스트를 props에서 받음 */}
        </p>
        <button className="card-button">{buttonText}</button> {/* 버튼 텍스트를 props에서 받음 */}
      </div>
      
    </div>
  );
};

export default Card;