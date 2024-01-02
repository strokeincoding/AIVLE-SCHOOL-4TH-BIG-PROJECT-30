import React from 'react';
import Card from '../components/Card/Card';
import Slider from '../components/Slider/Slider';
import './Home.css'; // 이 줄을 추가하세요.
import mandaratImage from '../assets/mandarat.png';
import bannerImage from '../assets/banner-image.jpg'; // Replace with your actual banner image path
import chatbotImage from '../assets/chatbotImage.png'; // Replace with your actual image path
import employmentImage from '../assets/employmentImage.png'; // Replace with your actual image path
import TeamMemberCard from '../components/TeamMemberCard/TeamMemberCard';
import team1 from '../assets/team1.png'; // Replace with your actual image path
import team2 from '../assets/team2.png'; // Replace with your actual image path
import team3 from '../assets/team3.png'; // Replace with your actual image path
import team4 from '../assets/team4.png'; // Replace with your actual image path
import team5 from '../assets/team5.png'; // Replace with your actual image path
import team6 from '../assets/team6.png'; // Replace with your actual image path
import team7 from '../assets/team7.png'; // Replace with your actual image path

// 배너 섹션 컴포넌트
const BannerSection = () => {
  return (
    <div className="banner-section" style={{ backgroundImage: `url(${bannerImage})` }}>
      <div className="banner-content">
        <h1>길잡이</h1>
        <p>"초보 개발자에게 정보제공?"</p>
        <p>추천 서비스 및 만다라트 생성 등을 통해 초보 개발자 길잡이 역할을 해줍니다.</p>
      </div>
    </div>
  );
};

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  centerMode: true, // 가운데 카드를 중심으로 보여주는 옵션
  centerPadding: '60px', // 가운데 카드 양 옆의 패딩 값
};

const teamMembers = [
  // Include `name` in each member object
  { src: team1, alt: '팀원1 이름', name: '팀원1', description: 'UI/UX 담당' , email: 'team1@example.com'},
  { src: team2, alt: '팀원2 이름', name: '팀원2', description: '팀원2 설명' , email: 'team1@example.com'},
  { src: team3, alt: '팀원3 이름', name: '팀원3', description: '팀원3 설명' , email: 'team1@example.com'},
  { src: team4, alt: '팀원4 이름', name: '팀원4', description: '팀원4 설명' , email: 'team1@example.com'},
  { src: team5, alt: '팀원5 이름', name: '팀원5', description: '팀원5 설명' , email: 'team1@example.com'},
  { src: team6, alt: '팀원6 이름', name: '팀원6', description: '팀원6 설명' , email: 'team1@example.com'},
  { src: team7, alt: '팀원7 이름', name: '팀원7', description: '팀원7 설명' , email: 'team1@example.com'},
  // ... other team members
];

  
const Home = () => {
  return (
    <div>
      <BannerSection bannerImage={'path-to-your-banner-image.jpg'} />
      <div className="card-container">
        <Card 
          title="만다라트" 
          text="하이만다라트만다라트만다라트만다라트만다라트만다라트만다라트만다라트만다라트만다라트만다라트만다라트만다라트만다라트
          만다라트만다라트만다라트만다라트만다라트만다라트만다라트만다라트만다라트만다라트만다라트만다라트만다라트만다라트만다라트만다라트
          만다라트만다라트만다라트만다라트만다라트만다라트만다라트만다라트만다라트만다라트만다라트만다라트" 
          imagePath={mandaratImage} 
        />
        <Card 
          title="챗봇" 
          text="하이" 
          imagePath={chatbotImage} 
        />
        <Card 
          title="취업" 
          text="하이" 
          imagePath={employmentImage} 
        />
      </div>
      <Slider {...settings} images={teamMembers.map(member => ({
        content: <TeamMemberCard key={member.name} src={member.src} alt={member.alt} name={member.name} description={member.description} email={member.email} />
      }))} />
    </div>
  );
};

export default Home;