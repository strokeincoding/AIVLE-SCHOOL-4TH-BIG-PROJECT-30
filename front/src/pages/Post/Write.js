import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../pages/ui/Button';

import './Post.css';
 
 
 
const Wrapper = styled.div`
    padding: 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f7f7f7;
`;
 
const Container = styled.div`
    width: 100%;
    max-width: 720px;
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 16px;
`;
 
const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;
 
const StyledLabel = styled.label`
    display: flex;
    flex-direction: column;
    font-weight: 600;
    color: #333;
`;
 
const StyledInput = styled.input`
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-top: 8px;
`;
 
const StyledTextArea = styled.textarea`
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-top: 8px;
    height: 120px; /* 또는 원하는 높이 */
`;
const CreatePost = () => {
  const [newPost, setNewPost] = useState({ title: '', body: '' });
  const navigate = useNavigate();
 

  const yourAuthToken = localStorage.getItem('token');
 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };
 
  const addPost = async () => {
    try {
      const response = await axios.post('http://localhost:8000/post/post/', newPost, {
        headers: {
          'Authorization': `Bearer ${yourAuthToken}` 
         
        }
      });
 
      if (response.status === 201) {
        navigate('/post');
      } else {
        console.error('Failed to add post');
      }
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };
 
  return (
    <Wrapper>
      <Container>
        <div className="board-title">Write content</div>
        <StyledForm onSubmit={(e) => {
          e.preventDefault();
          addPost();
        }}>
          <StyledLabel>
            Title
            <StyledInput
              type="text"
              name="title"
              height={20}
              value={newPost.title}
              onChange={handleInputChange}
            />
          </StyledLabel>
          <StyledLabel>
            Body
            <StyledTextArea
              name="body"
              height={480}
              value={newPost.body}
              onChange={handleInputChange}
            />
          </StyledLabel>
          <Button title='Add Post' type="submit"/>
        </StyledForm>
      </Container>
    </Wrapper>
  );
};
 
export default CreatePost;