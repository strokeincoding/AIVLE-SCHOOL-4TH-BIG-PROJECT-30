import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../pages/ui/Button';
import styled from 'styled-components';
 
const LeftAlignedImage = styled.img`
  float: left; // Aligns the image to the left
  max-width: 100%;
  max-height: 300px;
  margin-right: 15px; 
  border-radius: 4px; 
  border: 1px solid #ddd;
`;
 
const Wrapper = styled.div`
  padding: 16px;
  width: calc(100% - 32px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to right bottom, #f0f3f8, #f7f9fc); 
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin: 20px 0;
  transition: all 0.3s ease;
  border: 1px solid #ccc;
 
  @media (max-width: 768px) {
    padding: 10px;
    width: calc(100% - 20px);
  }
 
  &:hover {
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }
`;
 
const Container = styled.div`
  width: 100%;
  max-width: 720px;
  background-color: #f9f9f9; 
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  text-align: center;
  border: 2px solid #bbb;
 
  :not(:last-child) {
    margin-bottom: 16px;
  }
 
  @media (max-width: 768px) {
    padding: 15px;
  }
 
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transform: translateY(-3px);
  }
 
  .post-view-row {
    margin-bottom: 12px;
    display: flex;
    align-items: center;
 
    label {
      font-weight: 600;
      color: #333;
      margin-right: 10px;
      min-width: 100px;
    }
 
    div, img {
      flex-grow: 1;
    }
  }
 
  img {
    max-width: 100%;
    height: auto;
    border-radius: 4px;
    margin-bottom: 12px;
  }
`;
 
const RecommendView = ({ history, match }) => {
  const [data, setData] = useState(null);
  const [envs, setEnvs] = useState({});
  const [occupations, setOccupations] = useState({});
  const [technologyStacks, setTechnologyStacks] = useState({});
  const [currentUsername, setCurrentUsername] = useState(null); 
 
  const { no } = useParams();
  const navigate = useNavigate();
 
  const yourAuthToken = localStorage.getItem('token');
  const getCookieValue = (name) => (
    document.cookie.split('; ').find(row => row.startsWith(name + '='))
    ?.split('=')[1]
  );
  useEffect(() => {
    
    axios.get('http://127.0.0.1:8000/user/Env/')
      .then(response => {
        const envMap = response.data.reduce((map, env) => {
          map[env.id] = env.env_name;
          return map;
        }, {});
        setEnvs(envMap);
      })
      .catch(error => console.error("Error fetching environments: ", error));
 
    axios.get('http://127.0.0.1:8000/user/TechnologyStack/')
      .then(response => {
        const stackMap = response.data.reduce((map, stack) => {
          map[stack.id] = stack.stack_name;
          return map;
        }, {});
        setTechnologyStacks(stackMap);
      })
      .catch(error => console.error("Error fetching technology stacks: ", error));
  }, []); 
 
  useEffect(() => {
    const nickname = getCookieValue('nickname');
    if (!nickname || nickname === 'undefined') {
      console.error('User nickname is not found or undefined');
    } else {
      setCurrentUsername(nickname);
    }
    const headers = {
      'Authorization': `Bearer ${yourAuthToken}`  
    };
    axios.get('http://127.0.0.1:8000/user/Occupation/')
      .then(response => {
        const occupationMap = response.data.reduce((map, occupation) => {
          map[occupation.id] = occupation.occupation_name;
          return map;
        }, {});
        setOccupations(occupationMap);
      })
      .catch(error => console.error("Error fetching occupations: ", error));
 
    axios.get(`http://localhost:8000/recommend/Recommend/${no}`, { headers })
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
        setData(null);
      });
  }, [no, yourAuthToken]);

 
  const deletePost = () => {
    if (window.confirm("정말 이 게시물을 삭제하시겠습니까?")) {
      const headers = {
        'Authorization': `Bearer ${yourAuthToken}`  
      };
      axios.delete(`http://localhost:8000/recommend/Recommend/${no}`, { headers })
        .then(() => {
          alert('게시물이 성공적으로 삭제되었습니다.');
          navigate('/recommend'); 
          setData(null);
        })
        .catch(error => {
          console.error('Error deleting post:', error.response ? error.response.data : error);
          alert('Failed to delete the post');
        });
    }
  };
 
  return (
    <>
    <h2 align="center">게시글 상세정보</h2>
    <Wrapper>
      <Container className="post-view-wrapper">
        {
          data ? (
            <>
                  {data.image && (
                  <LeftAlignedImage src={data.image} alt="Post"  />)}
              
              <div className="post-view-row">
                <label>제목</label>
                <label>{data.title}</label>
              </div>
              <div className="post-view-row">
                <label>작성자</label>
                <label>{data.user}</label>
              </div>
              <div className="post-view-row">
                <label>모집분야 및 인원수</label>
                <label>{data.cate}</label>
              </div>
              <div className="post-view-row">
                <label>모집분야</label>
                <div>{data && data.occupation.map(id => occupations[id]).join(', ')}</div>
              </div>
              <div className="post-view-row">
                <label>기술스택</label>
                <div>{data && data.technology_stacks.map(id => technologyStacks[id]).join(', ')}</div>
              </div>
              <div className="post-view-row">
                <label>근무환경</label>
                <div>{data.env && envs[data.env]}</div>
              </div>
              
              <div className="post-view-row">
                <label>요구사항</label>
                <div>{data.Exp_require}</div>
              </div>
              <div className="post-view-row">
                <label>설명</label>
                <div>{data.Project_Description}</div>
              </div>
              
              
             
            </>
          ) : '해당 게시글을 찾을 수 없습니다.'
        }
      </Container>
    </Wrapper>
    <div className="button-group">
  <Button title='목록' onClick={() => navigate(-1)} data={data} />
  {data && currentUsername === data.user && (
    <Button title='삭제' onClick={deletePost} />
  )}
</div>
    </>
   
  );
}
 
export default RecommendView;