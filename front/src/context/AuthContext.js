import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // localStorage에서 토큰을 확인하여 초기 로그인 상태 설정
  const [isLoggedIn, setLoggedIn] = useState(() => {
    const token = localStorage.getItem('token');
    return !!token; // token이 있으면 true, 없으면 false 반환
  });

  const login = async (nickname, password, onSuccess, onError) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/user/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nickname, password })
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.access);
        setLoggedIn(true);
        if (onSuccess) onSuccess();
      } else {
        if (onError) onError('Invalid username or password');
      }
    } catch (error) {
      if (onError) onError('Network error');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
  };

  // 애플리케이션 로드 시 로그인 상태 확인
  useEffect(() => {
    const token = localStorage.getItem('token');
    setLoggedIn(!!token);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
