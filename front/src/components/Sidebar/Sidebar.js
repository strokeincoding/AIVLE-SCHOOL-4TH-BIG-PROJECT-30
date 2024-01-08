import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import SidebarItem from "./SidebarItem";
import profile1 from "../../assets/profile1.png";
import profile2 from "../../assets/profile2.png";
import profile3 from "../../assets/profile3.png";
import profile4 from "../../assets/profile4.png";
import profile5 from "../../assets/profile5.png";
import profile6 from "../../assets/profile6.jpg";

const profileImages = [
  profile1,
  profile2,
  profile3,
  profile4,
  profile5,
  profile6
];
const ProfileContainer = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Side = styled.div`
  display: flex;
  border-right: 1px solid #e0e0e0;
  flex-direction: column;
  align-items: center;
  min-width: 280px;
  min-height: 100vh;
  overflow-y: auto;
`
const Profile = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 100%;
`
const Menu = styled.div`
  margin-top: 30px;
  width: 200px;
  display: flex;
  flex-direction: column;
`
const LinkStyle = {
    color: "gray",
    textDecoration: "none"
  };
  
const ActiveLinkStyle = {
    color: "black"
  };
  
const ProfileSelector = styled.div`
  display: flex; /* 사진들을 가로로 나열합니다 */
  overflow-x: auto; /* 옆으로 스크롤 가능하게 합니다 */
  max-width: 280px; /* 선택 가능한 프로필 사진 영역의 최대 너비 */
`;
const ProfileImage = styled.img`
  width: 50px; /* 프로필 선택 이미지의 너비 */
  height: 50px; /* 프로필 선택 이미지의 높이 */
  border-radius: 50%; /* 원형으로 보이게 합니다 */
  margin-right: 10px; /* 이미지 사이의 간격 */
  cursor: pointer;
`;
const Tooltip = styled.div`
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  bottom: 150%;
  left: 50%;
  margin-left: -60px;
  opacity: 0;
  transition: opacity 0.3s;
`;

const ProfileTitle = styled.h3`
  background: rgba(255, 255, 255, 0.7);
  border-radius: 10px;
  padding: 5px 20px;
  margin-bottom: 10px; // 프로필 사진 위에 나타나도록 조정
  z-index: 10; // 다른 요소들 위에 나타나도록 z-index 설정
`;

function Sidebar() {
  const [currentProfile, setCurrentProfile] = useState(profileImages[0]);
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);

  const handleProfileClick = () => {
    setIsSelectorOpen(!isSelectorOpen); // 프로필 선택기의 표시 상태를 토글합니다.
  };

  const handleProfileSelect = (image) => {
    setCurrentProfile(image); // 선택된 이미지로 현재 프로필을 업데이트합니다.
    setIsSelectorOpen(false); // 프로필 선택기를 닫습니다.
  };
  const menus = [
    { name: "홈", path: "/first"},
    { name: "나만의 만다르트", path: "/man" },
    { name: "공모전 추천 시스템", path: "/mylist" },
    { name: "공모전 게시판", path: "/recommend" },
    { name: "자유 게시판", path: "/post" },
    { name: "내 정보", path: "/setting"}
  ];
  return (
    <Side>
      <ProfileContainer>
        <ProfileTitle>프로필 변경</ProfileTitle> {/* 제목을 프로필 이미지 위에 표시 */}
        <Profile src={currentProfile} onClick={handleProfileClick} />
        {isSelectorOpen && (
          <ProfileSelector>
            {profileImages.map((image, index) => (
              <ProfileImage
                key={index}
                src={image}
                onClick={() => handleProfileSelect(image)}
              />
            ))}
          </ProfileSelector>
        )}
      </ProfileContainer>
      <Menu>
        {menus.map((menu, index) => {
          return (
            <NavLink
              to={menu.path}
              key={index}
              style={({ isActive }) =>
                isActive ? { ...LinkStyle, ...ActiveLinkStyle } : LinkStyle
              }
            >
            <SidebarItem
                menu={menu}
            />
            </NavLink>
          );
        })}
      </Menu>
    </Side>
  );
}

export default Sidebar;