import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../pages/ui/Button';
import ImageUploadExample from './ImageUploadExample';




const Wrapper = styled.div`
    padding: 16px;
    width: calc(100% - 32px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Container = styled.div`
    width: 100%;
    max-width: 720px;

    :not(:last-child) {
        margin-bottom: 16px;
    }
`;


const CreatePost = () => {
  const [newPost, setNewPost] = useState({ title: '', body: '' });
  const navigate = useNavigate();

  // 이 부분은 인증 토큰을 어디서 가져오는지에 따라 달라집니다.
  // 예를 들어, localStorage에서 토큰을 가져오는 경우:
  const yourAuthToken = localStorage.getItem('token');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const addPost = async () => {
    try {
      const response = await axios.post('http://localhost:8000/post/post/', newPost, {
        headers: {
          'Authorization': `Bearer ${yourAuthToken}`  // 헤더에 토큰 추가
          
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
        <h1>Add a New Post</h1>
        <form onSubmit={(e) => {
          e.preventDefault();
          addPost();
        }}>
          <label>
            Title:
            <input
              type="text"
              name="title"
              height={20}
              value={newPost.title}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Body:
            <textarea
              name="body"
              height={480}
              value={newPost.body}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <ImageUploadExample />
          <Button title='Add Post' type="submit"/>
        </form>
      </Container>
    </Wrapper>
  );
};

export default CreatePost;
