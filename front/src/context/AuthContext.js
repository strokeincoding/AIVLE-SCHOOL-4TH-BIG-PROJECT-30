import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const login = (username, password, onSuccess) => {
    // 로그인 로직...
    if (username === 'aivle30' && password === '1234') {
      setLoggedIn(true);
      onSuccess(); // 로그인 성공 시 콜백 호출
    } else {
      // 로그인 실패 처리
    }
  };

  const logout = () => {
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};