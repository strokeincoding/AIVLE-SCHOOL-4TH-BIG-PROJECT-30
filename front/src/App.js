import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Join from './pages/Join';
import Post from './pages/Post/Post';
import Write from './pages/Post/Write';
import Man from './pages/Man/Man';
import Chatbot from './components/ChatbotPopup/Chatbot'
import Categories from './components/Categories';
import Sidebar from './components/Sidebar/Sidebar';
import styled from 'styled-components';
import PostView from './pages/Post/PostView';
import Recommend from './pages/Recommend/Recommend';
import RecommendView from './pages/Recommend/RecommendView';
import RecommendWrite from './pages/Recommend/RecommendWrite';
import Mylist from './pages/Mylist/Mylist';

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
      {isLoggedIn ? (
        <>
          <Route path="/post" element={<Post />} />
          <Route path="/post/post/:no" element={<PostView />} />
          <Route path="/create-post" element={<Write />} />
          <Route path="/man" element={<Man />} />
          <Route path="/mylist" element={<Mylist />} />
          <Route path="/mylist" element={<Mylist />} />
          <Route path="/recommend" element={<Recommend />} />
          <Route path="/recommend/recommend/:no" element={<RecommendView />} />
          <Route path="/RecommendWrite" element={<RecommendWrite />} />
        </>
      ) : (
        <>
          <Route path="/" element={<Home />} />
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
      {isLoggedIn && <Chatbot />} {/* 로그인 상태일 때만 챗봇 표시 */} {/* 챗봇 컴포넌트를 Layout 컴포넌트 밖에 배치 */}
    </>
  );
};

export default App;
