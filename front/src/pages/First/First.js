import React, { useState, useEffect } from 'react';
import ImgMediaCard from './Firstcard';
import { Box, Pagination, Stack } from '@mui/material'; 
import { useAuth } from '../../context/AuthContext';
 
const Mylist = () => {
    const [recommendations, setRecommendations] = useState([]);
    const { isLoggedIn } = useAuth(); 
    const [currentPage, setCurrentPage] = useState(1); 
    const postsPerPage = 9;
    const pageCount = Math.ceil(recommendations.length / postsPerPage);
    const fetchRecommendations = async () => {
      if (!isLoggedIn) return; 
 
      const token = localStorage.getItem('token'); 
      const apiUrl = `http://127.0.0.1:8000/crawling/crawlingview`;
      try {
          const response = await fetch(apiUrl, {
              method: 'GET',
              headers: {
                  'Authorization': `Bearer ${token}`,
              },
              credentials: 'include'
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
    }, [isLoggedIn]);
 
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = recommendations.slice(indexOfFirstPost, indexOfLastPost);
 
 
    return (
        <div>
            {isLoggedIn ? (
                <>
                    <h2 style={{ textAlign: 'center',fontSize: '2rem', fontWeight: 'bold' }}>추천 IT 컨텐츠</h2>
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
                            <p>현재 추천 IT 컨텐츠가 없습니다</p>
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