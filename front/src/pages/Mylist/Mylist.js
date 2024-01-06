import React, { useState, useEffect } from 'react';
import ImgMediaCard from './Mediacard';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination'; // 페이지네이션 컴포넌트를 추가합니다.
import Stack from '@mui/material/Stack';
 
const Mylist = () => {
    const [recommendations, setRecommendations] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태를 추가합니다.
    const postsPerPage = 8; // 페이지 당 게시물 수를 8로 설정합니다.
    const navigate = useNavigate();
    const getCookieValue = (name) => (
        document.cookie.split('; ').find(row => row.startsWith(name + '='))
        ?.split('=')[1]
    );
 
    const handleMoreClick = (postId) => {// 추가
        navigate(`/recommend/Recommend/${postId}`);// 추가
    };// 추가
 
    const fetchRecommendations = async () => {
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
            setRecommendations(data.recommend_post_ids); // 서버로부터 받은 데이터를 상태에 설정
        } catch (error) {
            console.error('Failed to fetch recommendations:', error);
        }
    };
 
    useEffect(() => {//버튼을 누르지 않아도 바로 추천시스템이 보이는 기능
        fetchRecommendations();
    }, []);
 
    const paginate = (event, value) => {
        setCurrentPage(value);
    };
 
    useEffect(() => {
        fetchRecommendations();
    }, [currentPage]);
 
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = recommendations.slice(indexOfFirstPost, indexOfLastPost);
    const pageCount = Math.ceil(recommendations.length / postsPerPage);
 
    return (
        <div>
            <h2 style={{ textAlign: 'center' }}>진행 공모전 현황</h2>
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
            {/* 페이지네이션 컴포넌트를 추가합니다. */}
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