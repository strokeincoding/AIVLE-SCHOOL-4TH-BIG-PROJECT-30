import React, { useState, useEffect,useCallback  } from 'react';
import ImgMediaCard from './Mediacard';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
 
const Mylist = () => {
    const [recommendations, setRecommendations] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 8; 
    const navigate = useNavigate();
    
    const getCookieValue = (name) => (
        document.cookie.split('; ').find(row => row.startsWith(name + '='))
        ?.split('=')[1]
    );
 
    const handleMoreClick = (postId) => {
        navigate(`/recommend/Recommend/${postId}`);
    };
 
    const fetchRecommendations = useCallback(async () => {
        const nickname = getCookieValue('nickname');
        if (!nickname || nickname === 'undefined') {
            console.error('Nickname is not found or undefined');
            return;
        }
        const apiUrl = `http://127.0.0.1:8000/constest/?nickname=${nickname}`;
        console.log('Sending nickname to server:', nickname, apiUrl);
        try {
            const response = await fetch(apiUrl, { method: 'GET', credentials: 'include' });
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
            setRecommendations(data.recommend_post_ids);
        } catch (error) {
            console.error('Failed to fetch recommendations:', error);
        }
    }, []);

 
    const paginate = (event, value) => {
        setCurrentPage(value);
    };
 
    useEffect(() => {
        fetchRecommendations();
    }, [currentPage,fetchRecommendations]);
 
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = recommendations.slice(indexOfFirstPost, indexOfLastPost);
    const pageCount = Math.ceil(recommendations.length / postsPerPage);
 
    return (
        <div>
            <h2 style={{ textAlign: 'center',fontSize: '2rem', fontWeight: 'bold' }}>공모전 추천</h2>
            <Grid container spacing={4}>
                {currentPosts.map((recommendation, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <ImgMediaCard
                            title={`제목: ${recommendation.title}`}
                            text={`설명: ${recommendation.Exp_require}`}
                            buttonText="More"
                            imagePath={`http://127.0.0.1:8000${recommendation.image}`}
                            onMoreClick={() => handleMoreClick(recommendation.id)}
                        />
                    </Grid>
                ))}
            </Grid>
            <Stack spacing={2} alignItems="center" justifyContent="center">
                <Pagination
                    count={pageCount}
                    page={currentPage}
                    onChange={paginate}
                    variant="outlined"
                    shape="rounded"
                />
            </Stack>
        </div>
    );
};
 
export default Mylist;