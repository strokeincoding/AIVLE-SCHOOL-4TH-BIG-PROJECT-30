import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(() => {
    const token = localStorage.getItem('token');
    return !!token; // 토큰이 있으면 true, 없으면 false 반환
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
        // 쿠키에 userId 설정
        document.cookie = `nickname=${nickname}; path=/`;
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
    localStorage.removeItem('mandalartData');
    setLoggedIn(false);
    // 쿠키에서 nickname 제거
    document.cookie = 'nickname=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
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
