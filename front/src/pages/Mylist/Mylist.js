import React, { useState } from 'react';
import ImgMediaCard from './Mediacard';
 
 
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
 
    const CardContainer = ({ children }) => {
        return (
<div style={{ display: 'flex', flexWrap: 'wrap', gap: '50px', margin: '50px' }}>
            {children}
</div>
        );
    };
 
    return (
<div>
<h2>Recommended for You</h2>
<button onClick={fetchRecommendations}>Get Recommendations</button>
        {recommendations.length > 0 ? (
<CardContainer> {/* Use CardContainer here */}
                {recommendations.map((recommendation, index) => (
<ImgMediaCard
                        key={index}
                        title={`제목: ${recommendation.title}`}
                        text={`설명: ${recommendation.Exp_require}`}
                        buttonText="More"
                        imagePath={`http://127.0.0.1:8000${recommendation.image}`}
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

