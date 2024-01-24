import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useAuth } from '../../context/AuthContext';
import ImgMediaCard from '../First/Firstcard';
import { Box, Card } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import PsychologyIcon from '@mui/icons-material/Psychology';
import WorkIcon from '@mui/icons-material/Work';
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
 
const getCookieValue = (name) => (
    document.cookie.split('; ').find(row => row.startsWith(name + '='))
    ?.split('=')[1]
);
 
function Infoview() {
  const [Email, setEmail] = useState('');
  const [Nickname, setNickname] = useState('');
  const [Name, setName] = useState('');
  const [TechnologyStacks, setTechnologyStacks] = useState([]);
  const [Occupation, setOccupation] = useState([]);
  const [Env, setEnv] = useState([]);
  const nickname = getCookieValue('nickname');
  const nav = useNavigate();
  const token = localStorage.getItem('token');
  const [userId, setUserId] = useState(null);
  const { logout } = useAuth();
  const [recommendations, setRecommendations] = useState([]);
  const [envs, setEnvs] = useState({});
  const [technologyStacksMap, setTechnologyStacksMap] = useState({});
  const [occupations, setOccupations] = useState({});
 
  useEffect(() => {
    const fetchUserData = async (userId) => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/user/User/${userId}/`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const userData = response.data;
        setUserId(userData.id);
        setNickname(userData.nickname);
        setEmail(userData.email);
        setName(userData.name);
        setTechnologyStacks(userData.technology_stacks);
        setOccupation(userData.occupation);
        setEnv(userData.env);
      } catch (error) {
        console.error(error);
        alert("사용자 정보를 가져오는 데 실패했습니다.");
      }
    };
 
    const fetchRecommendations = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/crawling/userliked/`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.status === 200) {
          setRecommendations(response.data);
        } else {
          throw new Error('Failed to fetch recommendations');
        }
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      }
    };
 
    if (!token) {
      alert("로그인이 필요합니다.");
      nav('/login');
      return;
    }
 
    axios.get('http://127.0.0.1:8000/user/User/', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      const users = response.data;
      const currentUser = users.find(user => user.nickname === nickname);
      if (currentUser) {
        fetchUserData(currentUser.id);
      }
    })
    .catch(error => {
      console.error(error);
      alert("사용자 목록을 가져오는 데 실패했습니다.");
    });
 
    fetchRecommendations();
 
    axios.get('http://127.0.0.1:8000/user/Env/')
      .then(response => {
        const newEnvs = response.data.reduce((map, env) => {
          map[env.id] = env.env_name;
          return map;
        }, {});
        setEnvs(newEnvs);
      })
      .catch(error => console.error("Error fetching environments: ", error));
 
    axios.get('http://127.0.0.1:8000/user/TechnologyStack/')
      .then(response => {
        const newTechnologyStacksMap = response.data.reduce((map, stack) => {
          map[stack.id] = stack.stack_name;
          return map;
        }, {});
        setTechnologyStacksMap(newTechnologyStacksMap);
      })
      .catch(error => console.error("Error fetching technology stacks: ", error));
 
    axios.get('http://127.0.0.1:8000/user/Occupation/')
      .then(response => {
        const newOccupations = response.data.reduce((map, occupation) => {
          map[occupation.id] = occupation.occupation_name;
          return map;
        }, {});
        setOccupations(newOccupations);
      })
      .catch(error => console.error("Error fetching occupations: ", error));
  }, [token, nav, nickname]);
 
  const handleEditClick = () => {
    nav('/edit'); 
  };
 
  const handleDeleteClick = () => {
    const confirmDeletion = window.confirm("정말로 탈퇴하시겠습니까?");
    if (confirmDeletion) {
      axios.delete(`http://127.0.0.1:8000/user/User/${userId}/`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      .then(response => {
        console.log("User deleted successfully");
        logout();
        localStorage.removeItem('token'); 
        nav('/'); 
      })
      .catch(error => {
        console.error('Error deleting user: ', error);
        alert("탈퇴 처리 중 오류가 발생했습니다.");
      });
    }
  };
 
 
  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
        <div style={{ padding: '63px', marginLeft: '256px' }}>
            <Card sx={{ width: 320, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <h2 className="text-base font-semibold leading-7 text-gray-900">개인정보 조회</h2>
                <div className="mt-10">
                    <p><strong><AccountCircleIcon /> 닉네임:</strong> {Nickname}</p>
                    <p><strong><EmailIcon /> 이메일:</strong> {Email}</p>
                    <p><strong><HowToRegIcon /> 이름:</strong> {Name}</p>
                    <p><strong><PsychologyIcon /> 기술스택:</strong> {TechnologyStacks.map(id => technologyStacksMap[id]).join(', ')}</p>
                    <p><strong><WorkIcon /> 희망직종:</strong> {Occupation.map(id => occupations[id]).join(', ')}</p>
                    <p><strong><AddHomeWorkIcon /> 선호환경:</strong> {Env.map(id => envs[id]).join(', ')}</p>
                    <div className="mt-3 flex items-center justify-end gap-x-2">
                        <Button onClick={handleEditClick} type="button">수정하기</Button>
                        <Button onClick={handleDeleteClick} type="button">탈퇴하기</Button>
                    </div>
                </div>
            </Card>
        </div>
 
        <div style={{ flex: '1', marginLeft: '20px' }}>
            <Box sx={{ width: '100%' }}>
                <h2 className="text-base font-semibold leading-7 text-gray-900" style={{ textAlign: 'center', marginBottom: '20px' }}>
                    좋아요한 컨텐츠
                </h2>
            </Box>
       
            <Box sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: 2
            }}>
                {recommendations.length > 0 ? (
                    recommendations.map((recommendation, index) => (
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
                    <p>좋아요한 게시물이 없습니다</p>
                )}
            </Box>
        </div>
    </div>
);
}
export default Infoview;