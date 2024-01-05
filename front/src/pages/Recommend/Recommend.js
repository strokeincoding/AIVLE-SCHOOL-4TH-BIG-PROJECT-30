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

  // Calculate the number of pages
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
    <>
      <CommonTable headersName={['글번호', '제목', '작성자']}>
        {currentPosts.map((post, index) => ( // Change to use currentPosts
          <CommonTableRow key={post.id}>
            <CommonTableColumn>{post.id}</CommonTableColumn>
            <CommonTableColumn>
              <Link to={`/recommend/Recommend/${post.id}`}>{post.title}</Link>
            </CommonTableColumn>
            <CommonTableColumn>{post.user}</CommonTableColumn>
          </CommonTableRow>
        ))}
      </CommonTable>
      <Button title='Create New Post' onClick={navigateToCreatePost} />
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
 
export default Recommend;