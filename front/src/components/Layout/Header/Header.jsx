import {Route, Routes} from 'react-router-dom';
import  './Header.css';
import Categories from '../../Categories';//홈,로그인,회원가입 보여줌
import { AuthProvider, useAuth } from '../../context/AuthContext';
import Home from '../../../pages/Home.js';
import Login from '../../../pages/Login.js';
import Join from '../../../pages/Join.js';
import Post from '../../../pages/Post.js';

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

const Header = () => {
    return (
        <header>
            <AuthProvider>
                <AuthRoutes />
            </AuthProvider>
        </header>
    )
}

export default Header





