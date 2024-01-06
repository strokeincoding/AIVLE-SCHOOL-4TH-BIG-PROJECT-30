import React, { useState, useEffect } from 'react';
import ImgMediaCard from './Firstcard';
import { Box } from '@mui/material';
import { useAuth } from '../../context/AuthContext';

const Mylist = () => {
    const [recommendations, setRecommendations] = useState([]);
    const { isLoggedIn } = useAuth(); // 로그인 상태 확인

    const fetchRecommendations = async () => {
      if (!isLoggedIn) return; // 로그인하지 않은 경우 함수 실행 중지
  
      const token = localStorage.getItem('token'); // 로컬 스토리지에서 토큰 가져오기
      const apiUrl = `http://127.0.0.1:8000/crawling/crawlingview`;
      try {
          const response = await fetch(apiUrl, {
              method: 'GET',
              headers: {
                  'Authorization': `Bearer ${token}`, // 인증 토큰 추가
              },
              credentials: 'include' // 쿠키 기반 인증을 사용하는 경우
          });
          if (!response.ok) {
              throw new Error(`Error: ${response.status}`);
          }
          const data = await response.json();
          setRecommendations(data);
      } catch (error) {
          console.error('Failed to fetch recommendations:', error);
      }
  };

    useEffect(() => {
        fetchRecommendations();
    }, [isLoggedIn]); // 로그인 상태 변경 시 재실행

    return (
        <div>
            {isLoggedIn ? (
                <>
                    <h2 style={{ textAlign: 'center', fontSize: '30px' }}>IT 정보 추천 페이지</h2> {/*가운데 정렬, 폰트 크기 30px*/}
                    <Box sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: 2
                    }}>
                        {recommendations.length > 0 ? (
                            recommendations.map((recommendation, index) => (
                                <ImgMediaCard
                                    key={index}
                                    id={recommendation.id}
                                    title={`${recommendation.title}`}
                                    text={`${recommendation.body}`}
                                    imagePath={recommendation.image}
                                    like={recommendation.like_count}
                                    url={recommendation.url} // 'url' prop 추가
                                />
                            ))
                        ) : (
                            <p>No recommendations available</p>
                        )}
                    </Box>
                </>
            ) : (
                <p>Please log in to see recommendations.</p> // 로그인하지 않은 사용자에 대한 메시지
            )}
        </div>
    );
};

export default Mylist;
