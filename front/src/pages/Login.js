// src/pages/Login.js
import React, { Component } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: '', // 오류 메시지 상태 추가
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value, error: '' });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;

    if (!username || !password) {
      this.setState({ error: '모든 필드를 채워주세요.' });
      return;
    }

    // 로그인 시도 후 성공 시 홈으로 리디렉션
    this.props.login(username, password, () => {
      this.props.navigate('/'); // 여기에서 홈으로 이동
    });
  };

  render() {
    const { isLoggedIn } = this.props;
    const { username, password, error } = this.state;

    if (isLoggedIn) {
      return <Navigate to="/" />;
    }

    return (
      <div>
        <h2>Login</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={this.handleSubmit}>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={username}
              onChange={this.handleInputChange}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={password}
              onChange={this.handleInputChange}
            />
          </label>
          <br />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

// Context 사용을 위한 HOC
export default function LoginWithAuth(props) {
  const navigate = useNavigate();
  const auth = useAuth();
  return <Login {...props} {...auth} navigate={navigate} />;
}
