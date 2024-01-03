import React, { useState, useEffect } from 'react';
import ImgMediaCard from './Firstcard';

const Mylist = () => {
    const [recommendations, setRecommendations] = useState([]);

    const getCookieValue = (name) => (
        document.cookie.split('; ').find(row => row.startsWith(name + '='))
        ?.split('=')[1]
    );

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
            setRecommendations(data.recommend_post_ids);
        } catch (error) {
            console.error('Failed to fetch recommendations:', error);
        }
    };

    useEffect(() => {
        fetchRecommendations(); // 컴포넌트가 마운트될 때 실행
    }, []); // 빈 배열을 사용하여 컴포넌트 마운트 시에만 실행

    const CardContainer = ({ children }) => (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '50px', margin: '50px' }}>
            {children}
        </div>
    );

    return (
        <div>
            <h2>Recommended for You</h2>
            {recommendations.length > 0 ? (
                <CardContainer>
                    {recommendations.map((recommendation, index) => (
                        <ImgMediaCard
                            key={index}
                            title={`제목: ${recommendation.title}`}
                            text={`설명: ${recommendation.Exp_require}`}
                            buttonText="LIKE"
                            imagePath="src/assets/to/team1.png"
                        />
                    ))}
                </CardContainer>
            ) : (
                <p>No recommendations available</p>
            )}
        </div>
    );
};

export default Mylist;
