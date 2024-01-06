import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
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
 
// InfoUpdate 컴포넌트 외부에 getCookieValue 함수 정의
const getCookieValue = (name) => (
    document.cookie.split('; ').find(row => row.startsWith(name + '='))
    ?.split('=')[1]
  );
function Infoview() {
  const [Email, setEmail] = useState('');
  const [Nickname, setNickname] = useState('');
  const [NewPassword, setNewPassword] = useState('');
  const [Name, setName] = useState('');
  const [TechnologyStacks, setTechnologyStacks] = useState([]);
  const [Occupation, setOccupation] = useState([]);
  const [Env, setEnv] = useState([]);
  const { no } = useParams();
  const nickname = getCookieValue('nickname');
  const nav = useNavigate();
  const token = localStorage.getItem('token');
  const [userId, setUserId] = useState(null); // userId 상태 추가
  const [selectedTechnologyStacks, setSelectedTechnologyStacks] = useState([]);
  const [selectedOccupations, setSelectedOccupations] = useState([]);
  const [selectedEnvs, setSelectedEnvs] = useState([]);
  const { logout } = useAuth(); // useAuth 훅으로부터 logout 함수 가져오기
  const [recommendations, setRecommendations] = useState([]);
  const [envs, setEnvs] = useState({});
  const [technologyStacksMap, setTechnologyStacksMap] = useState({});
  const [occupations, setOccupations] = useState({});
  const handleEditClick = () => {
    nav('/edit'); // This should match the path you set up in your routes
  };
  useEffect(() => {
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
    if (userId){
      fetchRecommendations();
    }
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
  }, [token, nav, nickname, userId]);
 
  
  const fetchUserData = (userId) => {
    axios.get(`http://127.0.0.1:8000/user/User/${userId}/`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
        const userData = response.data;
        setUserId(userData.id); // 사용자 ID 상태 설정
        setNickname(userData.nickname);
        setEmail(userData.email);
        setNewPassword(userData.password)
        setName(userData.name);
        setTechnologyStacks(userData.technology_stacks);
        setOccupation(userData.occupation);
        setEnv(userData.env);
    })
    .catch(error => {
      console.error(error);
      alert("사용자 정보를 가져오는 데 실패했습니다.");
    });
  };
 
  const fetchRecommendations = async () => {
    if (!userId) return;  // 사용자 ID 없을 경우 함수 종료
    try {
      const response = await axios.get(`http://127.0.0.1:8000/crawling/userliked/`, { // 추천 데이터를 불러오는 API 경로로 변경해주세요
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        setRecommendations(response.data); // 응답 데이터를 상태에 저장
      } else {
        throw new Error('Failed to fetch recommendations');
      }
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };
 
 
  // ...이벤트 핸들러 함수들...
  // 드롭다운의 선택 변경을 처리하는 핸들러 함수들
  const handleTechnologyStacksChange = (event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setSelectedTechnologyStacks(value);
  };
  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  };
  const onNicknameHandler = (e) => {
    setNickname(e.currentTarget.value);
  };
  const onNewPasswordHandler = (e) => {
    setNewPassword(e.currentTarget.value);
  };
  const onNameHandler = (e) => {
    setName(e.currentTarget.value);
  };
  const parseIds = (value) => {
    // If the value is already an array (of strings or numbers), map to integers directly
    if (Array.isArray(value)) {
      return value.map((v) => parseInt(v)).filter(Boolean);
    }
    // If the value is a string, split and then map to integers
    if (typeof value === 'string') {
      return value.split(',').map((v) => parseInt(v.trim())).filter(Boolean);
    }
    // If the value is neither an array nor a string, log an error and return an empty array
    console.error('Invalid input for parseIds: ', value);
    return [];
  }
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
        // 로그아웃 처리
        logout();
        localStorage.removeItem('token'); // 토큰 삭제 (선택적)
        nav('/'); // 홈으로 이동
      })
      .catch(error => {
        console.error('Error deleting user: ', error);
        alert("탈퇴 처리 중 오류가 발생했습니다.");
      });
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (!userId) {
      alert("사용자 ID를 찾을 수 없습니다.");
      return;
    }
    // ID가 유효한지 확인하는 추가 로직이 필요할 수 있습니다.
    const req = {
      nickname: Nickname,
      email: Email,  
      name: Name,
      password: NewPassword, // 비밀번호 변경이 필요한 경우에만 포함
      technology_stacks: parseIds(TechnologyStacks),
      occupation: parseIds(Occupation),
      env: parseIds(Env),
    };
    axios.put(`http://127.0.0.1:8000/user/User/${userId}/`, req, {
      headers: {
        "Authorization": `Token ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      console.log("200 OK");
      nav('/setting');
    }).catch(err => {
      console.error(err.response.data);
      alert("오류 발생");
    });
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
<p><strong><PsychologyIcon /> 기술 스택:</strong> {TechnologyStacks.map(id => technologyStacksMap[id]).join(', ')}</p>
<p><strong><WorkIcon /> 선호 직종:</strong> {Occupation.map(id => occupations[id]).join(', ')}</p>
<p><strong><AddHomeWorkIcon /> 작업 환경:</strong> {Env.map(id => envs[id]).join(', ')}</p>
<div className="mt-3 flex items-center justify-end gap-x-2">
<Button onClick={handleEditClick} type="button">수정하기</Button>
                {/* Add a button for the deletion functionality */}
<Button onClick={handleDeleteClick} type="button">탈퇴하기</Button>
</div>
</div>
</Card>
</div>
 
        <div style={{ flex: '1', marginLeft: '20px' }}>
<Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 2
          }}>
            {recommendations.length > 0 ? (
              recommendations.map((recommendation, index) =>(
<ImgMediaCard
                  key={index}
                  id={recommendation.id}
                  title={`${recommendation.title}`}
                  text={`${recommendation.body}`}
                  imagePath={recommendation.image}
                  like={recommendation.like_count}
                  url={recommendation.url} // 'url' prop 추가
                />
              )) 
            ) : (
<p>No recommendations available</p>
 
            )}
</Box>
</div>
</div>
  );
}
export default Infoview;