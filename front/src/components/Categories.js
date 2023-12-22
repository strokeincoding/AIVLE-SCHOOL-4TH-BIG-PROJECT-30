import React from 'react';
import styled from 'styled-components';
import { NavLink, useNavigate, Outlet } from 'react-router-dom'; // Outlet 추가
import { useAuth } from '../context/AuthContext';


const CategoriesBlock = styled.div`
  display: flex;
  padding: 1rem;
  width: 768px;
  margin: 0 auto;
  @media screen and (max-width: 768px) {
    width: 100%;
    overflow-x: auto;
  }
`;

const Category = styled(NavLink)`
  font-size: 1.125rem;
  cursor: pointer;
  white-space: pre;
  text-decoration: none;
  color: inherit;
  padding-bottom: 0.25rem;

  &:hover{
    color: #495057;
  }

  &+&{
    margin-left: 1rem;
  }
`;

const Categories = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); // 로그아웃 후 홈으로 이동
  };

  return (
    <div>
      <header>
        <CategoriesBlock>
          <Category to="/">홈</Category>
          {!isLoggedIn && (
            <>
              <Category to="/login">로그인</Category>
              <Category to="/join">회원가입</Category>
            </>
          )}
          {isLoggedIn && (
            <>
              <Category to="/post">게시물</Category>
              {/* 로그아웃 기능을 수행하는 Category 컴포넌트 */}
              <Category as="div" onClick={handleLogout}>로그아웃</Category>
            </>
          )}
        </CategoriesBlock>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Categories;



