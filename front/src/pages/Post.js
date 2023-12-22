import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // useNavigate로 변경

const Post = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate(); // useNavigate 사용

  useEffect(() => {
    axios.get('http://localhost:8000/post/post/')
      .then(response => setPosts(response.data))
      .catch(error => console.error(error));
  }, []);

  const navigateToCreatePost = () => {
    navigate('/create-post'); // navigate 함수 사용
  };

  return (
    <div>
      <h1>Existing Posts</h1>
      <button onClick={navigateToCreatePost}>Create New Post</button>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <strong>{post.title}</strong>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Post;
