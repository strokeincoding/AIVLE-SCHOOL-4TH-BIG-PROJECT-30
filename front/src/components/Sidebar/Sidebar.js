import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import SidebarItem from "./SidebarItem";
import profile from "../../assets/profile1.png";

const Side = styled.div`
  display: flex;
  border-right: 1px solid #e0e0e0;
  flex-direction: column;
  align-items: center;
  width: 20%;
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
  

function Sidebar() {
  const menus = [
    { name: "나만의 만다르트", path: "/man" },
    { name: "추천 시스템", path: "/mylist" },
    { name: "공모전 게시판", path: "/recommend" },
    { name: "잡다 정보 게시판", path: "/post" },
    { name: "내 정보", path: "/setting"}
  ];
  return (
    <Side>
      <Profile src={profile}></Profile>
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