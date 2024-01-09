import React from 'react';
import styled from 'styled-components';
import { NavLink, useNavigate, Outlet } from 'react-router-dom'; // Outlet 추가
import { useAuth } from '../context/AuthContext';


const CategoriesBlock = styled.div`
  display: flex;
  justify-content: flex-end; /* 항목들을 오른쪽으로 정렬 */
  padding: 1rem;
  margin-right: 100px; /* 오른쪽에서 20px 떨어진 위치 */
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
const getCookieValue = (name) => (
  document.cookie.split('; ').find(row => row.startsWith(`${name}=`))
  ?.split('=')[1]
);

const Categories = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const nickname = getCookieValue('nickname');


  const handleLogout = () => {
    logout();
    navigate('/'); 
    localStorage.removeItem('nickname');
  };

  return (
    <div>
      <header>
        <CategoriesBlock>
          {!isLoggedIn && (
            <>
              <Category to="/">홈</Category>
              <Category to="/login">로그인</Category>
              <Category to="/TermsOfUse">회원가입</Category>
            </>
          )}
          {isLoggedIn && (
            <>
              
              <Category to="/setting" style={{ marginLeft: '10px' }}>
                {nickname}님 
              </Category>
              
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



