import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, Box, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, Box, Container, Typography } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
 
 
function Register() {
    const [formData, setFormData] = useState({
        nickname: '',
        email: '',
        name: '',
        password: '',
        env:[], // 작업 환경을 배열로 초기화
        occupation: [], // 선호 직종을 배열로 초기화
        technology_stacks: []  // 기술 스택을 배열로 초기화
    });
    const [occupation, setOccupation] = useState([]);  // 선호 직종 상태
    const [techStacks, setTechStacks] = useState([]);  // 기술 스택 상태
    const [env, setEnv] = useState([]);  // 작업 환경 상태
    const navigate = useNavigate();
    // 기술 스택 데이터 불러오기
    useEffect(() => {
        fetch('http://localhost:8000/user/TechnologyStack/')
            .then(response => response.json())
            .then(data => setTechStacks(data))
            .catch(error => {
            // 에러 처리
                console.error('Error fetching tech stacks:', error);
            });
    }, []);  // 빈 의존성 배열로 마운트 시에만 호출
 
 
    // 선호 직종 데이터 불러오기
    useEffect(() => {
        fetch('http://localhost:8000/user/Occupation/')
            .then(response => response.json())
            .then(data => setOccupation(data))
            .catch(error => {
            // 에러 처리
                console.error('Error fetching tech stacks:', error);
            });
    }, []);  // 빈 의존성 배열로 마운트 시에만 호출
 
 
    // 작업 환경 데이터 불러오기
    useEffect(() => {
        fetch('http://localhost:8000/user/Env/')
            .then(response => response.json())
            .then(data => setEnv(data))
            .catch(error => {
            // 에러 처리
                console.error('Error fetching tech stacks:', error);
            });
    }, []);  // 빈 의존성 배열로 마운트 시에만 호출
 
 
    // CSRF 토큰을 가져오는 함수
    const getCsrfToken = () => {
        let token = null;
        if (document.cookie) {
            const cookies = document.cookie.split(';');
            for (let cookie of cookies) {
                const [name, value] = cookie.trim().split('=');
                if (name === 'csrftoken') {
                    token = value;
                    break;
                }
            }
        }
        return token;
    };
    const handleInputChange = (event) => {
        const { name, value } = event.target;
   
        // 'value'가 문자열이 아니라 배열이어야 합니다. Material-UI는 다중 선택에서 배열을 제공합니다.
        // 만약 문자열이 올 수도 있다면, 문자열을 배열로 변환해야 합니다.
        let newValue;
        if (typeof value === 'string') {
            newValue = value.split(',');
        } else {
            // Material-UI는 다중 선택을 위해 배열을 반환합니다.
            newValue = value;
        }
   
        // 'newValue'를 정수 배열로 변환합니다.
        const intValueArray = newValue.map((item) => parseInt(item));
   
        setFormData({
            ...formData,
            [name]: intValueArray,
        });
    };
    const handleInputChange = (event) => {
        const { name, value } = event.target;
   
        // 'value'가 문자열이 아니라 배열이어야 합니다. Material-UI는 다중 선택에서 배열을 제공합니다.
        // 만약 문자열이 올 수도 있다면, 문자열을 배열로 변환해야 합니다.
        let newValue;
        if (typeof value === 'string') {
            newValue = value.split(',');
        } else {
            // Material-UI는 다중 선택을 위해 배열을 반환합니다.
            newValue = value;
        }
   
        // 'newValue'를 정수 배열로 변환합니다.
        const intValueArray = newValue.map((item) => parseInt(item));
   
        setFormData({
            ...formData,
            [name]: intValueArray,
        });
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    const handleChange2 = (event) => {
      const { name, value } = event.target;
    
      // 'value'가 문자열이 아니라 배열이어야 합니다. Material-UI는 다중 선택에서 배열을 제공합니다.
      // 만약 문자열이 올 수도 있다면, 문자열을 배열로 변환해야 합니다.
      let newValue;
      if (typeof value === 'string') {
        newValue = [value]; // 단일 선택 시 배열로 변환
      } else if (Array.isArray(value)) {
        newValue = value; // 이미 배열인 경우 그대로 사용
      } else {
        newValue = [value]; // 다른 형식인 경우 배열로 변환
      }
    
      // 'newValue'를 정수 배열로 변환합니다.
      const intValueArray = newValue.map((item) => parseInt(item));
    
      setFormData({
        ...formData,
        [name]: intValueArray,
      });
    };
   
 
    const handleSubmit = (e) => {
      e.preventDefault();
      const csrftoken = getCsrfToken();
      console.log(formData);
      axios.post('http://localhost:8000/user/signup/', formData, {
          headers: {
              'X-CSRFToken': csrftoken
          }
      })
      .then(res => {
          console.log(res);
          navigate('/login'); // 회원가입 성공 후 로그인 페이지로 이동
      })
      .catch(err => {
          console.error(err);
          // 에러 처리
      });
  };
 
   
  return (
    <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography component="h1" variant="h5">Register</Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="nickname"
                    label="Nickname"
                    type="text"
                    id="nickname"
                    value={formData.nickname}
                    onChange={handleChange}
                    placeholder="Nickname"
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="email"
                    label="Email Address"
                    type="email"
                    id="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="name"
                    label="Name"
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel id="occupation-label">Occupation</InputLabel>
                    <Select
                        labelId="occupation-label"
                        id="occupation"
                        name="occupation"
                        value={formData.occupation}
                        onChange={handleChange2}
                        label="Occupation"
                    >
                        {occupation.map(occup => (
                            <MenuItem key={occup.id} value={occup.id}>{occup.occupation_name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <InputLabel id="techStacks-label">Technology Stacks</InputLabel>
                    <Select
                        labelId="techStacks-label"
                        id="technology_stacks"
                        multiple
                        name="technology_stacks"
                        value={formData.technology_stacks}
                        onChange={handleInputChange}
                        label="Technology Stacks"
                    >
                        {techStacks.map(stack => (
                            <MenuItem key={stack.id} value={stack.id}>{stack.stack_name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <InputLabel id="env-label">Environment</InputLabel>
                    <Select
                        labelId="env-label"
                        id="env"
                        name="env"
                        value={formData.env}
                        onChange={handleChange2}
                        label="Environment"
                    >
                        {env.map(env => (
                            <MenuItem key={env.id} value={env.id}>{env.env_name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Register
                </Button>
            </Box>
        </Box>
    </Container>
);
}
 
 
export default Register;