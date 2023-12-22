import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

function Register() {
    const [formData, setFormData] = useState({
        nickname: '',
        email: '',
        name: '',
        password: ''
    });

    const navigate = useNavigate();

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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      const csrftoken = getCsrfToken();

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
        <form onSubmit={handleSubmit}>
            <input type="text" name="nickname" onChange={handleChange} placeholder="Nickname" />
            <input type="email" name="email" onChange={handleChange} placeholder="Email" />
            <input type="text" name="name" onChange={handleChange} placeholder="Name" />
            <input type="password" name="password" onChange={handleChange} placeholder="Password" />
            <button type="submit">Register</button>
        </form>
    );
}

export default Register;
