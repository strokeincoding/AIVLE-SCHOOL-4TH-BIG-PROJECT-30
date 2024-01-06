import React, { useState, useEffect } from 'react';
import ImgMediaCard from './Mediacard';
import { useNavigate } from 'react-router-dom'; // 추가
import Grid from '@mui/material/Grid'; // Grid 컴포넌트를 추가하여 카드를 그리드로 배치
 
 
const Mylist = () => {
    const [recommendations, setRecommendations] = useState([]);
    const navigate = useNavigate(); // 추가
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
 
    return (
        <div>
            <h2 style={{ textAlign: 'center', fontSize: '30px'}}>진행 공모전 현황</h2> {/* 가운데 정렬, 폰트 크기 30px */}
            <Grid container spacing={1}> {/* 포스터간 간격 */}
                {recommendations.length > 0 ? (
                    recommendations.map((recommendation, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}> {/* 반응형 그리드 설정 */}
                            <ImgMediaCard
                                title={`제목: ${recommendation.title}`}
                                text={`설명: ${recommendation.Exp_require}`}
                                buttonText="More"
                                imagePath={`http://127.0.0.1:8000${recommendation.image}`}
                                onMoreClick={() => handleMoreClick(recommendation.id)}
                            />
                        </Grid>
                    ))
                ) : (
                    <p>현재 관련 공모전이 없습니다.</p>
                )}
            </Grid>
        </div>
    );
};
 
export default Mylist;