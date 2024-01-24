import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import CommonTableColumn from '../../components/table/CommonTableColumn';
import CommonTableRow from '../../components/table/CommonTableRow';
import CommonTable from '../../components/table/CommonTable';
import '../../components/table/CommonTable.css';
import Button from '../../pages/ui/Button_write';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import './Post.css';
import ModeIcon from '@mui/icons-material/Mode'; 
const Post = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
 
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
  const truncateString = (str, num) => {
    if (str.length > num) {
      return str.slice(0, num) + '...';
    } else {
      return str;
    }
  };
  const getPostNumber = (index) => {    
    return posts.length - (currentPage - 1) * postsPerPage - index;  
   };
  const pageCount = Math.ceil(posts.length / postsPerPage);
 
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
    return date.toISOString().split('T')[0];
  };
  return (
    <div className="post-container">
      <div className="board-title"style={{ fontSize: '2rem', fontWeight: 'bold' }}>자유게시판</div>
      <CommonTable headersName={['No', '제목', '등록일','작성자']}>
        {currentPosts.map((post, index) => (
          <CommonTableRow key={post.id}>
            <CommonTableColumn>{getPostNumber(index)}</CommonTableColumn>
            <CommonTableColumn className="title-column">
              <Link to={`/post/post/${post.id}`}>{truncateString(post.title, 20)}</Link>
            </CommonTableColumn>
            <CommonTableColumn>{formatDate(post.created_at)}</CommonTableColumn>
            <CommonTableColumn>{post.user}</CommonTableColumn>
          </CommonTableRow>
        ))}
      </CommonTable>
      <div className="create-post-container">
      <Button onClick={navigateToCreatePost}>
        <ModeIcon/> 글쓰기
      </Button>
      </div>
      <Stack spacing={2} alignItems="center" justifyContent="center">
        <Pagination
          count={pageCount} 
          page={currentPage}
          onChange={paginate}
          variant="outlined"
          shape="rounded"
        />
      </Stack>
    </div>
  );
};
 
export default Post;