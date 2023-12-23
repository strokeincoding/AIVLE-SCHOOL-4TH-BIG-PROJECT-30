import React from 'react'
import './Card.css';



const Card = () => {
    return (
      <div className="card">
        <div className="card-image-wrapper">
          <img src="path-to-your-image.jpg" alt="Card" className="card-image" />
        </div>
        <div className="card-content">
          <h2 className="card-title">취업</h2>
          <p className="card-text">
            모두어학원은 3년 구독자와 1.5% 증가율을 보유한 어학 1위입니다.
            10년간의 고객사례, 성공 경험을 바탕으로 대학가 고객이 직접 선택할 수 있는 곳은
            모두어학원이 유일합니다.
          </p>
          <button className="card-button">1위에서 시작하기</button>
        </div>
        
      </div>
    );
  };
  
  export default Card;