import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from './context/AuthContext'; // AuthProvider 임포트 제거
import Home from './pages/Home';
import Login from './pages/Login';
import Join from './pages/Join';
import Post from './pages/Post';
import Write from './pages/Write';
import Categories from './components/Categories';
import Sidebar from './components/Sidebar';
import styled from 'styled-components';

const Layout = styled.div`
  display: flex;
`;

const Content = styled.div`
  flex-grow: 1;
`;

// AuthRoutes 컴포넌트
const AuthRoutes = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {isLoggedIn ? (
        <>
          <Route path="/post" element={<Post />} />
          <Route path="/create-post" element={<Write />} />
        </>
      ) : (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
        </>
      )}
    </Routes>
  );
};

// App 컴포넌트
const App = () => {
  const { isLoggedIn } = useAuth(); // 로그인 상태 확인

  return (
    <>
      <Categories />
      <Layout>
        {isLoggedIn && <Sidebar />} {/* 로그인 상태일 때만 사이드바 표시 */}
        <Content>
          <AuthRoutes />
        </Content>
      </Layout>
    </>
  );
};

export default App;
