import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, Box, Container, Typography } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';

function Register() {
    const [formData, setFormData] = useState({
        nickname: '',
        email: '',
        name: '',
        password: '',
        env:[], 
        occupation: [], 
        technology_stacks: [] 
    });
    const [occupation, setOccupation] = useState([]);  
    const [techStacks, setTechStacks] = useState([]);  
    const [env, setEnv] = useState([]);  
    const navigate = useNavigate();
    useEffect(() => {
        fetch('http://localhost:8000/user/TechnologyStack/')
            .then(response => response.json())
            .then(data => setTechStacks(data))
            .catch(error => {
                console.error('Error fetching tech stacks:', error);
            });
    }, []);  

    useEffect(() => {
        fetch('http://localhost:8000/user/Occupation/')
            .then(response => response.json())
            .then(data => setOccupation(data))
            .catch(error => {
                console.error('Error fetching tech stacks:', error);
            });
    }, []);  

    useEffect(() => {
        fetch('http://localhost:8000/user/Env/')
            .then(response => response.json())
            .then(data => setEnv(data))
            .catch(error => {
                console.error('Error fetching tech stacks:', error);
            });
    }, []);  

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

        let newValue;
        if (typeof value === 'string') {
            newValue = value.split(',');
        } else {
            newValue = value;
        }
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

      let newValue;
      if (typeof value === 'string') {
        newValue = [value];
      } else if (Array.isArray(value)) {
        newValue = value; 
      } else {
        newValue = [value]; 
      }
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
          navigate('/login'); 
      })
      .catch(err => {
        console.error(err);
        if (err.response && err.response.data) {
          const emailErrors = err.response.data.email || [];
          const nicknameErrors = err.response.data.nickname || [];
          if (emailErrors.length > 0){
              alert(emailErrors[0]);
          }
          if (nicknameErrors.length > 0){
              alert(nicknameErrors[0]);
          }
        }
      });
  };

  return (
<Container component="main" maxWidth="xs">
<CssBaseline />
<Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
<LockOutlinedIcon />
</Avatar>
<Typography component="h1" variant="h5">회원가입</Typography>
<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
<TextField
                    margin="normal"
                    required
                    fullWidth
                    name="nickname"
                    label="아이디"
                    type="text"
                    id="nickname"
                    value={formData.nickname}
                    onChange={handleChange}
                    placeholder="아이디"
                />
<TextField
                    margin="normal"
                    required
                    fullWidth
                    name="email"
                    label="이메일"
                    type="email"
                    id="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="이메일"
                />
<TextField
                    margin="normal"
                    required
                    fullWidth
                    name="name"
                    label="이름"
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="이름"
                />
<TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="비밀번호"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="비밀번호"
                />
<FormControl fullWidth margin="normal">
<InputLabel id="occupation-label">희망 직종</InputLabel>
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
<InputLabel id="techStacks-label">기술 스택</InputLabel>
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
<InputLabel id="env-label">선호 환경</InputLabel>
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