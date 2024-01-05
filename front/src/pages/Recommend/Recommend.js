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
import ModeIcon from '@mui/icons-material/Mode';
import './Post.css';
const Recommend = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10; // Set the number of posts per page
 
  const navigate = useNavigate();
 
  useEffect(() => {
    axios.get('http://localhost:8000/recommend/Recommend/')
      .then(response => {
        setPosts(response.data.reverse());
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
 
  const getPostNumber = (index) => {    
    return posts.length - (currentPage - 1) * postsPerPage - index;  
  }
  const pageCount = Math.ceil(posts.length / postsPerPage);
 
  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
 
  const navigateToCreatePost = () => {
    navigate('/RecommendWrite ');
  };
 
  // Change page
  const paginate = (event, value) => {
    setCurrentPage(value);
  };
 
  return (
    <div className="post-container">
      <div className="board-title">공모전/해커톤 참가자 모집</div>
      <CommonTable headersName={['No', '제목', '작성자']}>
        {currentPosts.map((post, index) => (
          <CommonTableRow key={post.id}>
            <CommonTableColumn>{getPostNumber(index)}</CommonTableColumn>
            <CommonTableColumn>
              <Link to={`/recommend/Recommend/${post.id}`}>{post.title}</Link>
            </CommonTableColumn>
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
          count={pageCount} // Set the count to the number of pages
          page={currentPage}
          onChange={paginate}
          variant="outlined"
          shape="rounded"
        />
      </Stack>
    </div>
  );
};
 
export default Recommend;