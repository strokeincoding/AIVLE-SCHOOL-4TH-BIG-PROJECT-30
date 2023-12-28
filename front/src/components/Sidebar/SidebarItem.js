import React from "react";
import styled from "styled-components";

const MenuItem = styled.div`
  padding: 10px 20px;
  margin-bottom: 10px;
  &:hover {
    background-color: #f0f0f0;
    border-radius: 5px;
    cursor: pointer;
  }
`;

const SidebarItem = ({ menu }) => {
  return <MenuItem>{menu.name}</MenuItem>;
};

export default SidebarItem;