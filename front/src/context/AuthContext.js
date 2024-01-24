import React, { createContext, useContext, useState, useEffect } from 'react';
 
const AuthContext = createContext();
 
export const useAuth = () => useContext(AuthContext);
 
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(() => {
    const token = localStorage.getItem('token');
    return !!token;
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

        document.cookie = `nickname=${nickname}; path=/`;
        if (onSuccess) onSuccess();
      } else {
        if (onError) onError('등록되지 않은 아이디이거나 아이디 또는 비밀번호를 잘못 입력했습니다.');
      }
    } catch (error) {
      if (onError) onError('Network error');
    }
  };
 
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('mandalartData');
    setLoggedIn(false);
    document.cookie = 'nickname=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  };
 
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
 