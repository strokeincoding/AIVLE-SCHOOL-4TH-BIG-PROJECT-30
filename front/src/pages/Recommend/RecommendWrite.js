import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../pages/ui/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';



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


const RecommendWrite = () => {
    const [newPost, setNewPost] = useState({
      title: '',
      categories: '',
      requiredSkills: '',
      projectDescription: '',
      workEnvironment: '',
      roles: '',
      experience: ''
    });
    const navigate = useNavigate();
  
    const yourAuthToken = localStorage.getItem('token');
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewPost({ ...newPost, [name]: value });
    };

  const addPost = async () => {
    try {
      const response = await axios.post('http://localhost:8000/recommend/recommend/', newPost, {
        headers: {
          'Authorization': `Bearer ${yourAuthToken}`  // 헤더에 토큰 추가
          
        }
      });

      if (response.status === 201) {
        navigate('/recommend');
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
            <Grid item xs={12} sm={6}>
                <TextField
                fullWidth
                label="Title"
                id="Title"
                type="text"
                name="title"
                value={newPost.title}
                onChange={handleInputChange}
                />
            </Grid> 
          </label>
          <br />
          <label>
            <Grid item xs={12} sm={6}>
                <TextField
                fullWidth
                label="Categories"
                select
                name="Categories"
                id="Categories"
                value={newPost.categories}
                onChange={handleInputChange}
                />
            </Grid>
          </label>
          <br />
          <label>
            <Grid item xs={12} sm={6}>
                <TextField
                fullWidth
                label="Required Skills"
                id="Required Skills"
                type="text"
                name="Required Skills"
                value={newPost.required}
                onChange={handleInputChange}
                />
            </Grid> 
          </label>
          <br />
          <label>
            <Grid item xs={12} sm={6}>
                <TextField
                fullWidth
                label="Project Description"
                id="Project Description"
                type="text"
                name="Project Description"
                value={newPost.project}
                onChange={handleInputChange}
                />
            </Grid> 
          </label>
          <br />
          <label>
            <Grid item xs={12} sm={6}>
                <TextField
                fullWidth
                label="Work Environment"
                id="Work Environment"
                type="text"
                name="Work Environment"
                value={newPost.work}
                onChange={handleInputChange}
                />
            </Grid> 
          </label>
          <br />
          <label>
            <Grid item xs={12} sm={6}>
                <TextField
                fullWidth
                label="Roles and Responsibilities"
                id="Roles and Responsibilities"
                type="text"
                name="Roles and Responsibilities"
                value={newPost.Roles}
                onChange={handleInputChange}
                />
            </Grid> 
          </label>
          <br />
          <label>
            <Grid item xs={12} sm={6}>
                <TextField
                fullWidth
                label="Experience Requirements"
                id="Experience Requirements"
                type="text"
                name="Experience Requirements"
                value={newPost.Experience}
                onChange={handleInputChange}
                />
            </Grid> 
          </label>
          <br />
          <Button title='Add Post' type="submit"/>
        </form>
      </Container>
    </Wrapper>
  );
};

export default RecommendWrite;
