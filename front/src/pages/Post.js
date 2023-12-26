import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import CommonTableColumn from '../components/table/CommonTableColumn';
import CommonTableRow from '../components/table/CommonTableRow';
import CommonTable from '../components/table/CommonTable';
import '../components/table/CommonTable.css';


const Post = () => {
  // State to store the list of posts
  const [posts, setPosts] = useState([]);

  // Hook to access the navigation function
  const navigate = useNavigate();

  // useEffect hook to fetch posts from the server when the component mounts
  useEffect(() => {
    axios.get('http://localhost:8000/post/post/')
      .then(response => {
        // Update the state with the fetched posts
        setPosts(response.data);
      })
      .catch(error => {
        // Log an error if the request fails
        console.error(error);
      });
  }, []); // The empty dependency array ensures this effect runs once after the initial render

  // Function to navigate to the post creation page
  const navigateToCreatePost = () => {
    navigate('/create-post');
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Formats the date to 'YYYY-MM-DD'
  };
  return (
    <>
      <CommonTable headersName={['글번호', '제목', '등록일','작성자']}>
        {posts.map((post, index) => (
          <CommonTableRow key={post.id}>
            <CommonTableColumn>{post.id}</CommonTableColumn>
            <CommonTableColumn>
              <Link to={`/post/post/${post.id}`}>{post.title}</Link>
            </CommonTableColumn>
            <CommonTableColumn>{formatDate(post.created_at)}</CommonTableColumn>
            <CommonTableColumn>{post.user}</CommonTableColumn>
          </CommonTableRow>
        ))}
      </CommonTable>
      <button onClick={navigateToCreatePost}>Create New Post</button>
    </>
  );
};

export default Post;