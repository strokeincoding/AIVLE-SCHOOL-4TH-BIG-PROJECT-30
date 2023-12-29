import React from 'react'
import './TeamMemberCard.css';

const TeamMemberCard = ({ src, alt, name, description }) => {
    return (
      <div className="team-member-card">
        <div className="team-member-image-wrapper">
          <img src={src} alt={alt} className="team-member-image" />
        </div>
        <div className="team-member-info">
          <h3>{name}</h3>
          <p>{description}</p>
          <button>스토리 보기</button>
        </div>
      </div>
    );
  };
  export default TeamMemberCard; // 이 줄을 추가하여 컴포넌트를 내보냅니다.
