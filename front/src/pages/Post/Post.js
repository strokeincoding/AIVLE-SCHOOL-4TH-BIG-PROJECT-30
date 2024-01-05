import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import CommonTableColumn from '../../components/table/CommonTableColumn';
import CommonTableRow from '../../components/table/CommonTableRow';
import CommonTable from '../../components/table/CommonTable';
import '../../components/table/CommonTable.css';
import Button from '../../pages/ui/Button';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import './Post.css';
 
const Post = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10; // Set the number of posts per page
 
  const navigate = useNavigate();
 
  useEffect(() => {
    axios.get('http://localhost:8000/post/post/')
      .then(response => {
        setPosts(response.data.reverse());
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const pageCount = Math.ceil(posts.length / postsPerPage);
 
  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
 
  const navigateToCreatePost = () => {
    navigate('/create-post');
  };

  const paginate = (event, value) => {
    setCurrentPage(value);
  };
 

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Formats the date to 'YYYY-MM-DD'
  };
  return (
    <>
      <div className="board-title">Board list</div>
  <CommonTable headersName={['글번호', '제목', '등록일', '작성자']}>
    {currentPosts.map((post, index) => ( // 이 부분을 'posts'에서 'currentPosts'로 변경
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
      <div className="create-post-container">
      <Button title='Create New Post' onClick={navigateToCreatePost}/>
      </div>
      <Stack spacing={2} alignItems="center" justifyContent="center">
        <Pagination
          count={pageCount} // Set the count to the number of pages
          page={currentPage}
          onChange={paginate}
          variant="outlined"
          shape="rounded"
        />
      </Stack>
    </>
  );
};
 
export default Post;