import { Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Join from './pages/Join';
import Post from './pages/Post';
import Write from './pages/Write';
import Categories from './components/Categories';

// AuthRoutes 컴포넌트
const AuthRoutes = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Routes>
      <Route element={<Categories />}>
        <Route path="/" element={<Home />} />
        {isLoggedIn ? (
          <>
            <Route path="/post" element={<Post />} />
            <Route path="/" element={<Home />} />
            <Route path="/create-post" element={<Write />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/join" element={<Join />} />
          </>
        )}
      </Route>
    </Routes>
  );
};

// App 컴포넌트
const App = () => {
  // Router 삭제
  return (
    <AuthProvider>
      <AuthRoutes />
    </AuthProvider>
  );
};

export default App;
