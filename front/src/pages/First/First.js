import React, { useState, useEffect } from 'react';
import ImgMediaCard from './Firstcard';
import { Box, Pagination, Stack } from '@mui/material'; // Import Pagination and Stack
import { useAuth } from '../../context/AuthContext';
 
const Mylist = () => {
    const [recommendations, setRecommendations] = useState([]);
    const { isLoggedIn } = useAuth(); // Check login status
    const [currentPage, setCurrentPage] = useState(1); // Current page state
    const postsPerPage = 9;
    const pageCount = Math.ceil(recommendations.length / postsPerPage);
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
    const paginate = (event, value) => {
    setCurrentPage(value);
    };
 
    useEffect(() => {
        fetchRecommendations();
    }, [isLoggedIn]);
    useEffect(() => {
        fetchRecommendations();
    }, [isLoggedIn]); // 로그인 상태 변경 시 재실행
 
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = recommendations.slice(indexOfFirstPost, indexOfLastPost);
 
 
    return (
        <div>
            {isLoggedIn ? (
                <>
                    <h2 style={{ textAlign: 'center',fontSize: '2rem', fontWeight: 'bold' }}>Latest AI-related news</h2>
                    <Box sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: 2
                    }}>
                        {currentPosts.length > 0 ? (
                            currentPosts.map((recommendation, index) => (
                                <ImgMediaCard
                                    key={index}
                                    id={recommendation.id}
                                    title={`${recommendation.title}`}
                                    text={`${recommendation.body}`}
                                    imagePath={recommendation.image}
                                    like={recommendation.like_count}
                                    url={recommendation.url}
                                />
                            ))
                        ) : (
                            <p>There are currently no recommended news</p>
                        )}
                    </Box>
                    {/* Add Pagination here */}
                    <Stack spacing={2} justifyContent="center" alignItems="center">
                        <Pagination
                            count={pageCount}
                            page={currentPage}
                            onChange={paginate}
                            color="primary"
                        />
                    </Stack>
                </>
            ) : (
                <p>You must log in to view it.</p>
            )}
        </div>
    );
};
 
export default Mylist;