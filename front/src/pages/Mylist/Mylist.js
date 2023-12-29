import React, { useState } from 'react';
 
const Mylist = () => {
    const [recommendations, setRecommendations] = useState([]);
 
    // 쿠키에서 사용자 정보를 가져오는 함수
    const getCookieValue = (name) => (
        document.cookie.split('; ').find(row => row.startsWith(name + '='))
        ?.split('=')[1]
    );
 
    // 서버로부터 추천 데이터를 가져오는 함수
    const fetchRecommendations = async () => {
        const nickname = getCookieValue('nickname'); // 쿠키에서 nickname 가져오기
        if (!nickname || nickname === 'undefined') {
            console.error('Nickname is not found or undefined');
            return;
        }
 
        // 서버에 보낼 데이터를 콘솔에 출력
        console.log('Sending nickname to server:', nickname);
 
        const apiUrl = `http://127.0.0.1:8000/constest?nickname=${nickname}`;
        try {
            const response = await fetch(apiUrl, {
                method: 'GET',
                credentials: 'include' // 쿠키를 포함시키기 위해 필요
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
            setRecommendations(data); // 가져온 데이터를 상태에 저장
        } catch (error) {
            console.error('Failed to fetch recommendations:', error);
        }
    };
 
    return (
<div>
<h2>Recommended for You</h2>
<button onClick={fetchRecommendations}>Get Recommendations</button>
<ul>
                {recommendations.length > 0 ? (
                    recommendations.map((item, index) => (
<li key={index}>{item.name}</li> // 추천 항목을 리스트 아이템으로 표시
                    ))
                ) : (
<li>No recommendations available</li>
                )}
</ul>
</div>
    );
};
 
export default Mylist;