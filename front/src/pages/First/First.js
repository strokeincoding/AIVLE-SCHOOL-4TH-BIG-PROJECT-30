import React, { useState, useEffect } from 'react';
import ImgMediaCard from './Firstcard';

const Mylist = () => {
    const [recommendations, setRecommendations] = useState([]);

    const fetchRecommendations = async () => {
        const apiUrl = `http://127.0.0.1:8000/user/Crawling/`;
        try {
            const response = await fetch(apiUrl, { method: 'GET', credentials: 'include' });
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
    }, []);

    return (
        <div>
            <h2>Recommended for You</h2>
            {recommendations.length > 0 ? (
                recommendations.map((recommendation, index) => (
                    <ImgMediaCard
                        key={index}
                        id={recommendation.id}
                        title={`제목: ${recommendation.title}`}
                        text={`설명: ${recommendation.body}`} // body로 변경
                        imagePath={recommendation.image}
                        likeStatus={recommendation.like} // '좋아요' 상태 추가
                    />
                ))
            ) : (
                <p>No recommendations available</p>
            )}
        </div>
    );
};

export default Mylist;
