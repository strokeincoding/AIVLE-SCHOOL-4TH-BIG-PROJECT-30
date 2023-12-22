import React, { createContext, useContext, useState } from 'react';
 
const AuthContext = createContext();
 
export const useAuth = () => useContext(AuthContext);
 
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
 
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
        // 인증 토큰 저장 및 로그인 상태 업데이트 (예시로만 작성)
        // 예를 들어, localStorage에 토큰 저장
        localStorage.setItem('token', data.access);
        setLoggedIn(true);
        if (onSuccess) onSuccess();
      } else {
        // 로그인 실패 처리
        if (onError) onError('Invalid username or password');
      }
    } catch (error) {
      // 네트워크 오류 처리
      if (onError) onError('Network error');
    }
  };
 
  const logout = () => {
    // 로그아웃 처리 (예시로만 작성)
    // 예를 들어, localStorage에서 토큰 제거
    localStorage.removeItem('token');
    setLoggedIn(false);
  };
 
  return (
<AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
</AuthContext.Provider>
  );
};