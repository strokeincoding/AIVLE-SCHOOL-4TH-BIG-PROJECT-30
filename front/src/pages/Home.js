import React from 'react';
import Card from '../components/Card/Card';
import Slider from '../components/Slider/Slider';
import './Home.css'; 
import mandaratImage from '../assets/mandarat.png';
import bannerImage from '../assets/back1.jpg'; 
import RecommendImage from '../assets/recommend.png'; 
import ChatbotImage from '../assets/chatbot.png'; 
import TeamMemberCard from '../components/TeamMemberCard/TeamMemberCard';
import team1 from '../assets/김태형.png'; 
import team2 from '../assets/전수민.jpg'; 
import team3 from '../assets/이상우.png'; 
import team4 from '../assets/박선빈.png';
import team5 from '../assets/오현진.png';
import team6 from '../assets/안수호.png';
 
const BannerSection = () => {
  return (
    <div className="banner-section" style={{ backgroundImage: `url(${bannerImage})` }}>
      <div className="banner-content">
        <h1>IT 길라잡이</h1>
        <p>"초보 개발자에게 정보제공?"</p>
        <p>추천 서비스 및 만다라트 생성 등을 통해 초보 개발자 길잡이 역할을 해줍니다</p>
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
  centerMode: true, 
  centerPadding: '60px', 
};
 
const teamMembers = [
  { src: team1, alt: '팀원1 이름', name: '김태형', description: 'PM' , email: 'steve181813@gmail.com'},
  { src: team2, alt: '팀원2 이름', name: '전수민', description: 'FE' , email: 'tnals8097@naver.com'},
  { src: team3, alt: '팀원3 이름', name: '이상우', description: 'FE' , email: 'vcx0526@naver.com'},
  { src: team4, alt: '팀원4 이름', name: '박선빈', description: 'BE' , email: 'sunbeen0111@naver.com'},
  { src: team5, alt: '팀원5 이름', name: '오현진', description: 'BE' , email: 'dhguswls5028@naver.com'},
  { src: team6, alt: '팀원6 이름', name: '안수호', description: 'AI' , email: 'ashmaster12@naver.com'},

];
 
 
const Home = () => {
  return (
    <div>
      <BannerSection bannerImage={'path-to-your-banner-image.jpg'} />
      <div className="card-container">
        <Card
          title="만다라트"
          text="만다라트에 대한 전체 내용입니다."
          fullText="회원가입시 입력한 희망직종에 따라 희망직종으로 취업하기 위해 준비해야 할 가이드를 만다라트로 나타내줍니다."
          imagePath={mandaratImage}
        />
        <Card
          title="추천시스템"
          text="추천시스템에 대한 전체 내용입니다."
          fullText="개인화된 IT 컨텐츠와 공모전 게시글을 추천해줍니다."
          imagePath={RecommendImage}
        />
        <Card
          title="챗봇"
          text="챗봇에 대한 전체 내용입니다."
          fullText={
            <>
              IT 직종 취직 정보를 제공해줍니다.<br />
              AI 엔지니어 채용 중인 회사 알려줘<br />
              그 회사에 대한 자격요건, 복지, 우대사항 알려줘
            </>
          }
          imagePath={ChatbotImage}
        />
      </div>
      <Slider {...settings} images={teamMembers.map(member => ({
        content: <TeamMemberCard key={member.name} src={member.src} alt={member.alt} name={member.name} description={member.description} email={member.email} />
      }))} />
    </div>
  );
};
 
export default Home;