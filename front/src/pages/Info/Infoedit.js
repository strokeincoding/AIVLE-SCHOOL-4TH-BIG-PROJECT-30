import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl'; 
import InputLabel from '@mui/material/InputLabel'; 
 
const getCookieValue = (name) => (
    document.cookie.split('; ').find(row => row.startsWith(name + '='))
    ?.split('=')[1]
  );
 
function InfoUpdate() {
  const [Email, setEmail] = useState('');
  const [Nickname, setNickname] = useState('');
  const [NewPassword, setNewPassword] = useState('');
  const [Name, setName] = useState('');
  const nickname = getCookieValue('nickname');
  const nav = useNavigate();
  const token = localStorage.getItem('token');
  const [userId, setUserId] = useState(null); 
  const [selectedTechStacks, setSelectedTechStacks] = useState([]);
  const [selectedOccupation, setSelectedOccupation] = useState([]);
  const [selectedEnv, setSelectedEnv] = useState([]);
  const [techStacks, setTechStacks] = useState([]);
  const [occupations, setOccupations] = useState([]);
  const [environments, setEnvironments] = useState([]);
 
  const handleTechStackChange = (event) => {
    const { value } = event.target;
    setSelectedTechStacks(
      typeof value === 'string' ? value.split(',') : value,
    );
  };
 
  const handleOccupationChange = (event) => {
    setSelectedOccupation(event.target.value);
  };
 
  const handleEnvChange = (event) => {
    setSelectedEnv(event.target.value);
  };
 
 
 
  useEffect(() => {
    if (!token) {
      alert("로그인이 필요합니다.");
      nav('/login');
      return;
    }

    const fetchUserData = (userId) => {
      axios.get(`http://127.0.0.1:8000/user/User/${userId}/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        const userData = response.data;
        setUserId(userData.id);
        setNickname(userData.nickname);
        setEmail(userData.email);
        setNewPassword(userData.password)
        setName(userData.name);
        setSelectedTechStacks(userData.technology_stacks); 
        setSelectedOccupation(userData.occupation); 
        setSelectedEnv(userData.env); 
      })
      .catch(error => {
        console.error(error);
        alert("사용자 정보를 가져오는 데 실패했습니다.");
      });
    };
    
    axios.get('http://127.0.0.1:8000/user/Env/', {
      headers: { 'Authorization': `Bearer ${token}` }
    }).then(response => setEnvironments(response.data));
 
    axios.get('http://127.0.0.1:8000/user/TechnologyStack/', {
      headers: { 'Authorization': `Bearer ${token}` }
    }).then(response => setTechStacks(response.data));
 
    axios.get('http://127.0.0.1:8000/user/Occupation/', {
      headers: { 'Authorization': `Bearer ${token}` }
    }).then(response => setOccupations(response.data));
 
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
 
  
 
  const onNameHandler = (e) => {
    setName(e.currentTarget.value);
  };
 
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (selectedTechStacks.length === 0) {
    alert("기술 스택을 선택해주세요."); 
    return; 
    }
    if (selectedOccupation.length === 0) {
    alert("선호 직무을 선택해주세요."); 
    return;
    }
    if (selectedEnv.length === 0) {
    alert("근무 환경을 선택해주세요."); 
    return; 
    }
    if (!userId) {
      alert("사용자 ID를 찾을 수 없습니다.");
      return;
    }
 
    const req = {
      nickname: Nickname,
      email: Email,
      name: Name,
      password: NewPassword,
      technology_stacks: selectedTechStacks, 
      occupation: Array.isArray(selectedOccupation) ? selectedOccupation : [selectedOccupation],
      env: Array.isArray(selectedEnv) ? selectedEnv : [selectedEnv],
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
    <div style={{ padding: '63px', marginLeft: '256px', margin: '20px' }}>
      <form onSubmit={onSubmitHandler}>
        <div className="space-y-12">
         
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">개인정보 수정</h2>
            <div className="mt-10">
              <TextField
                type="text"
                label="이름"
                variant="outlined"
                value={Name}
                onChange={onNameHandler}
                style={{ width: '50%', margin: '20px 0' }} 
              />
            </div>
          </div>
 
          <div style={{ margin: '20px 0' }}> 
            <FormControl variant="outlined" style={{ width: '50%' }}>
              <InputLabel id="tech-stack-select-label">기술 스택</InputLabel>
              <Select
                labelId="tech-stack-select-label"
                id="tech-stack-select"
                multiple
                value={selectedTechStacks}
                onChange={handleTechStackChange}
                input={<OutlinedInput label="Technology Stacks" />}
              >
                {techStacks.map((stack) => (
                  <MenuItem key={stack.id} value={stack.id}>
                    {stack.stack_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
 
          <div style={{ margin: '20px 0' }}> 
            <FormControl variant="outlined" style={{ width: '50%' }}>
              <InputLabel id="occupation-select-label">희망 직종</InputLabel>
              <Select
                labelId="occupation-select-label"
                id="occupation-select"
                value={selectedOccupation}
                onChange={handleOccupationChange}
                input={<OutlinedInput label="Occupation" />}
              >
                {occupations.map((occupation) => (
                  <MenuItem key={occupation.id} value={occupation.id}>
                    {occupation.occupation_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
 
          <div style={{ margin: '20px 0' }}> 
            <FormControl variant="outlined" style={{ width: '50%' }}>
              <InputLabel id="env-select-label">선호 환경</InputLabel>
              <Select
                labelId="env-select-label"
                id="env-select"
                value={selectedEnv}
                onChange={handleEnvChange}
                input={<OutlinedInput label="Environment" />}
              >
                {environments.map((env) => (
                  <MenuItem key={env.id} value={env.id}>
                    {env.env_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
 
          <div style={{ marginTop: '20px', display: 'flex' }}>
            <Button onClick={() => nav('/setting')} type="button">
              취소
            </Button>
            <Button type='submit'>
              저장
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
                }
  export default InfoUpdate;