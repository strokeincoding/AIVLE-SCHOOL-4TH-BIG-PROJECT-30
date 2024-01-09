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
import First from './pages/First/First';
import Infoview from './pages/Info/Info';
import InfoUpdate from './pages/Info/Infoedit';
import TermsOfUseForm from './pages/TermsOfUse/TermsOfUseForm';


const Layout = styled.div`
  display: flex;
`;

const Content = styled.div`
  flex-grow: 1;
`;

const AuthRoutes = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Routes>
      {isLoggedIn ? (
        <>
          <Route path="/first" element={<First />} />
          <Route path="/post" element={<Post />} />
          <Route path="/post/post/:no" element={<PostView />} />
          <Route path="/create-post" element={<Write />} />
          <Route path="/man" element={<Man />} />
          <Route path="/mylist" element={<Mylist />} />
          <Route path="/mylist" element={<Mylist />} />
          <Route path="/recommend" element={<Recommend />} />
          <Route path="/recommend/recommend/:no" element={<RecommendView />} />
          <Route path="/RecommendWrite" element={<RecommendWrite />} />
          <Route path="/setting" element={<Infoview />} />
          <Route path="/edit" element={<InfoUpdate />} />
        </>
      ) : (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
          <Route path="/TermsOfUse" element={<TermsOfUseForm />} />
        </>
      )}
    </Routes>
  );
};

const App = () => {
  const { isLoggedIn } = useAuth(); 

  return (
    <>
      <Categories />
      <Layout>
        {isLoggedIn && <Sidebar />} 
        <Content>
          <AuthRoutes />
        </Content>
      </Layout>
      {isLoggedIn && <Chatbot />}
    </>
  );
};

export default App;
