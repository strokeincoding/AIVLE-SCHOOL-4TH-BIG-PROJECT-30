import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    <div>
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
            value={newPost.title}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Body:
          <textarea
            name="body"
            value={newPost.body}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="submit">Add Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
