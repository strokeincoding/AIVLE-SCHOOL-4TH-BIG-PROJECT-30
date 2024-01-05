import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InfoUpdate from './Infoedit';

// InfoUpdate 컴포넌트 외부에 getCookieValue 함수 정의
const getCookieValue = (name) => (
    document.cookie.split('; ').find(row => row.startsWith(name + '='))
    ?.split('=')[1]
  );

function Infodelete() {
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
  const deleteEditClick = () => {
    nav('/'); // This should match the path you set up in your routes
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
  }, [token, nav, nickname]);

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
        // Assuming you have a logout function to clear the token, call it here
        // logout();
        localStorage.removeItem('token'); // Clear the token from local storage
        nav('/'); // Navigate to the homepage
      })
      .catch(error => {
        console.error(error);
        alert("탈퇴 처리 중 오류가 발생했습니다.");
      });
    }
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
    <div>
      <div style={{ padding: '63px', marginLeft: '256px' }}>
        {/* Other form fields */}
        <div className="mt-3 flex items-center justify-end gap-x-2">
          {/* Existing buttons */}
          <Button onClick={handleDeleteClick} type="button">탈퇴하기</Button>
        </div>
      </div>
    </div>
  );
} 
export default Infodelete;




    