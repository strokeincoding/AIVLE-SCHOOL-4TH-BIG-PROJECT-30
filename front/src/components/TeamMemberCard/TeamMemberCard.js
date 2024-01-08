import React from 'react'
import './TeamMemberCard.css';

const TeamMemberCard = ({ src, alt, name, description, email }) => {
  const [showEmail, setShowEmail] = React.useState(false);

  const handleEmailButtonClick = () => {
    setShowEmail(!showEmail); 
  };

  return (
    <div className="team-member-card">
      <div className="team-member-image-wrapper">
        <img src={src} alt={alt} className="team-member-image" />
      </div>
      <div className="team-member-info">
        <h3>{name}</h3>
        <p>{description}</p>
        {showEmail ? (
          <p>{email}</p> 
        ) : (
          <button onClick={handleEmailButtonClick}>이메일 보기</button>
        )}
      </div>
    </div>
  );
};

export default TeamMemberCard;
