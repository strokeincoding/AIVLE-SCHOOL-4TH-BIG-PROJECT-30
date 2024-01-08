import React from "react";
import styled from "styled-components";
 
const StyledButton = styled.button`
    padding: 8px 16px;
    font-size: 16px;
    border-width: 1px;
    border-radius: 8px;
    cursor: pointer;
    display: flex;        // Add this to align the icon and text
    align-items: center;  // Add this to vertically center the contents
    gap: 8px;             // Add this to create some space between the icon and text
`;
 
function Button(props) {
    const { onClick, children } = props;  
 
    return <StyledButton onClick={onClick}>{children || "Button"}</StyledButton>;
}
 
export default Button;