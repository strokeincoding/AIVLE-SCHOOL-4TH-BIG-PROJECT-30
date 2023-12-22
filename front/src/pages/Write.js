import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅을 임포트합니다.

const CreatePost = () => {
  const [newPost, setNewPost] = useState({ title: '', body: '' });
  const navigate = useNavigate(); // useNavigate 훅을 사용합니다.

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const addPost = async () => {
    try {
      const response = await axios.post('http://localhost:8000/post/post/', newPost);
      if (response.status === 201) {
        // Post가 성공적으로 추가된 후 PostList 페이지로 리다이렉트합니다.
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
