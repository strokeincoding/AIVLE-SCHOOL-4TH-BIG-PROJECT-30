import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

// InfoUpdate 컴포넌트 외부에 getCookieValue 함수 정의
const getCookieValue = (name) => (
    document.cookie.split('; ').find(row => row.startsWith(name + '='))
    ?.split('=')[1]
  );

function InfoUpdate() {
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
            <form onSubmit={onSubmitHandler}>
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">개인정보 수정</h2>
                  
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    {/* 이름 입력 필드 */}
                    <div className="sm:col-span-2">
                      <TextField
                        type="text"
                        label="이름"
                        variant='outlined'
                        value={Name}
                        onChange={onNameHandler}
                      />
                    </div>
                  </div>
                </div>
                {/* TechnologyStacks 입력 필드 */}
                <div className="sm:col-span-4">
                  <TextField
                    type="text"
                    label="기술 스택"
                    variant='outlined'
                    value={TechnologyStacks.join(", ")}
                    onChange={e => setTechnologyStacks(e.target.value.split(", "))}
                  />
                </div>
    
                {/* Occupation 입력 필드 */}
                <div className="sm:col-span-4">
                  <TextField
                    type="text"
                    label="선호 직종"
                    variant='outlined'
                    value={Occupation.join(", ")}
                    onChange={e => setOccupation(e.target.value.split(", "))}
                  />
                </div>
    
                {/* Env 입력 필드 */}
                <div className="sm:col-span-4">
                  <TextField
                    type="text"
                    label="작업 환경"
                    variant='outlined'
                    value={Env.join(", ")}
                    onChange={e => setEnv(e.target.value.split(", "))}
                  />
                </div>
    
                {/* 버튼 */}
                <div className="mt-3 flex items-center justify-end gap-x-2">
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
        </div>
      );
    }
    
export default InfoUpdate;




    