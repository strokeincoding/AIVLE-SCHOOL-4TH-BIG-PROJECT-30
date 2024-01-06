import React from 'react';
import Card from '../components/Card/Card';
import Slider from '../components/Slider/Slider';
import './Home.css'; // 이 줄을 추가하세요.
import mandaratImage from '../assets/mandarat.png';
import bannerImage from '../assets/back1.jpg'; // Replace with your actual banner image path
import chatbotImage from '../assets/chatbotImage.png'; // Replace with your actual image path
import employmentImage from '../assets/employmentImage.png'; // Replace with your actual image path
import TeamMemberCard from '../components/TeamMemberCard/TeamMemberCard';
import team1 from '../assets/김태형.png'; // Replace with your actual image path
import team2 from '../assets/전수민.jpg'; // Replace with your actual image path
import team3 from '../assets/이상우.png'; // Replace with your actual image path
import team4 from '../assets/박선빈.png'; // Replace with your actual image path
import team5 from '../assets/오현진.png'; // Replace with your actual image path
import team6 from '../assets/안수호.png'; // Replace with your actual image path
import team7 from '../assets/김장현.png'; // Replace with your actual image path
 
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
  { src: team1, alt: '팀원1 이름', name: '김태형', description: 'pm' , email: 'steve181813@gmail.com'},
  { src: team2, alt: '팀원2 이름', name: '전수민', description: '프론트엔드' , email: 'tnals8097@naver.com'},
  { src: team3, alt: '팀원3 이름', name: '이상우', description: '프론트엔드' , email: 'vcx0526@naver.com'},
  { src: team4, alt: '팀원4 이름', name: '박선빈', description: '백엔드' , email: 'sunbeen0111@naver.com'},
  { src: team5, alt: '팀원5 이름', name: '오현진', description: '백엔드' , email: 'dhguswls5028@naver.com'},
  { src: team6, alt: '팀원6 이름', name: '안수호', description: 'ai' , email: 'ashmaster12@naver.com'},
  { src: team7, alt: '팀원7 이름', name: '김장현', description: 'ai' , email: 'kharu3126@gmail.com'},
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
          title="추천시스템"
          text="하이"
          imagePath={chatbotImage}
        />
        <Card
          title="챗봇"
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