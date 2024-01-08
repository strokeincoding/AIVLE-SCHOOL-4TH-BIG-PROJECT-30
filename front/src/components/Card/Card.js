import React, { useState } from 'react'
import './Card.css';
 
const Modal = ({ isOpen, close, title, content }) => {
  if (!isOpen) return null;
 
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>{title}</h2>
        <p>{content}</p>
        <button onClick={close}>닫기</button>
      </div>
    </div>
  );
};
 
const Card = ({ title, text, fullText, imagePath }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
 
  const handleMoreClick = () => {
    setIsModalOpen(true);
  };
 
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
 
  return (
    <div className="card">
      <div className="card-image-wrapper">
        <img src={imagePath} alt={title} className="card-image" />
      </div>
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <p className="card-text">
          {text}
        </p>
        <button onClick={handleMoreClick}>더 보기</button>
      </div>
      {/* 모달 컴포넌트 호출 */}
      <Modal isOpen={isModalOpen} close={handleCloseModal} title={title} content={fullText} />
    </div>
  );
};
 
export default Card;