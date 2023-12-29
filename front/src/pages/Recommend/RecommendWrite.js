import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../pages/ui/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';

// Styled components
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

// TitleField 컴포넌트
const TitleField = ({ title, handleInputChange }) => (
<Grid item xs={12}>
  <TextField
    fullWidth
    label="Title"
    id="Title"
    type="text"
    name="title"
    value={title}
    onChange={handleInputChange}
  />
</Grid>
);

// CategorySelect 컴포넌트
const CategorySelect = ({ categories, selectedCategories, handleCategoryChange }) => (
<Grid item xs={12}>
  <FormControl fullWidth variant="outlined">
    <InputLabel id="categories-label">Categories</InputLabel>
    <Select
      labelId="categories-label"
      id="Categories"
      multiple
      value={selectedCategories}
      onChange={handleCategoryChange}
      input={<OutlinedInput label="Categories" />}
      name="categories"
    >
      {categories.map((category) => (
        <MenuItem key={category.id} value={category.id}>
          {category.name}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
</Grid>
);



// TechnologyStackSelect 컴포넌트
const TechnologyStackSelect = ({ occupationName, selectedStacks, handleStackChange, technologyStacks }) => (
<Grid item xs={12}>
  <h3>{occupationName} Required Skills</h3>{/* 직업 이름을 표시 */}
  <FormControl fullWidth variant="outlined">
    <InputLabel id="technology-stacks-label">Required Skills</InputLabel>
    <Select
      labelId="technology-stacks-label"
      id="TechnologyStacks"
      multiple
      value={selectedStacks}
      onChange={handleStackChange}
      input={<OutlinedInput label="Required Skills" />}
      name="technology_stacks"
    >
      {technologyStacks.map((stack) => (
        <MenuItem key={stack.id} value={stack.id}>
          {stack.stack_name}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
</Grid>
);

// RecommendWrite 메인 컴포넌트
const RecommendWrite = () => {
const [newPost, setNewPost] = useState({
  title: '',
  cate: '',
  technology_stacks: [],
  env: '',
  Exp_require: '',
  occupation: [],
  Project_Description: '',
  categories: [],
  requiredSkills: {},
});

const [categories, setCategories] = useState([]);
const [technologyStacks, setTechnologyStacks] = useState([]); // Technology stacks state
const [selectedTechStacks, setSelectedTechStacks] = useState({}); // Selected tech stacks for each occupation
const navigate = useNavigate();
const yourAuthToken = localStorage.getItem('token');

const handleStackChange = (occupationId) => (event) => {
  const { value } = event.target;
  const currentStacks = selectedTechStacks[occupationId] || [];
  
  // 중복된 ID 제거
  const updatedStacks = value.filter(stackId => !currentStacks.includes(stackId));

  setSelectedTechStacks({ 
    ...selectedTechStacks, 
    [occupationId]: [...currentStacks, ...updatedStacks]
  });
};

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setNewPost({ ...newPost, [name]: value });
};

const handleCategoryChange = (event) => {
  const { value } = event.target;
  setNewPost({ ...newPost, occupation: value});
};


const addPost = async (e) => {
  e.preventDefault();

  // 모든 occupation에 대한 선택된 기술 스택 ID들을 하나의 배열로 합침
  const combinedTechStacks = Object.values(selectedTechStacks).flat();

  // 중복 제거
  const uniqueTechStacks = Array.from(new Set(combinedTechStacks));

  // 변경된 postData 생성
  const postData = {
    title: newPost.title,
    cate: newPost.cate,
    technology_stacks: uniqueTechStacks, // 중복이 제거된 기술 스택 ID 배열
    env: newPost.env,
    Exp_require: newPost.Exp_require,
    occupation: newPost.occupation, // occupation ID 배열 사용
    Project_Description: newPost.Project_Description
  };

  console.log(postData);
  try {
    const response = await axios.post('http://127.0.0.1:8000/recommend/Recommend/', postData, {
      headers: {
        'Authorization': `Bearer ${yourAuthToken}`
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

useEffect(() => {
  const fetchOccupations = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/user/Occupation/');
      setCategories(response.data); // 전체 occupation 데이터 저장
    } catch (error) {
      console.error('Error fetching occupations:', error);
    }
  };

  const fetchTechnologyStacks = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/user/TechnologyStack/');
      setTechnologyStacks(response.data); // Save technology stacks data
    } catch (error) {
      console.error('Error fetching technology stacks:', error);
    }
  };

  fetchOccupations();
  fetchTechnologyStacks();
}, []);

return (
  <Wrapper>
    <Container>
      <h1>Add a New Post</h1>
      <form onSubmit={addPost}>
        <Grid container spacing={2}>
          <TitleField title={newPost.title} handleInputChange={handleInputChange} />
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="cate"
              id="cate"
              type="text"
              name="cate"
              value={newPost.cate}
              onChange={handleInputChange}
            /></Grid>
          <CategorySelect
            categories={categories.map(c => ({ id: c.id, name: c.occupation_name }))}
            selectedCategories={newPost.occupation}
            handleCategoryChange={handleCategoryChange}
          />
          {newPost.occupation.map(occupationId => (
<TechnologyStackSelect
key={occupationId}
occupationName={categories.find(c => c.id === occupationId).occupation_name}
selectedStacks={selectedTechStacks[occupationId] || []}
handleStackChange={handleStackChange(occupationId)}
technologyStacks={technologyStacks}
/>
))}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Work Environment"
              id="env"
              type="text"
              name="env"
              value={newPost.env}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Experience Requirements"
              id="Exp_require"
              type="text"
              name="Exp_require"
              value={newPost.Exp_require}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Project Description"
              id="Project_Description"
              type="text"
              name="Project_Description"
              value={newPost.Project_Description}
              onChange={handleInputChange}
            />
          </Grid>
          </Grid>
        <Button title='Add Post' type="submit" />
      </form>
    </Container>
  </Wrapper>
);
};

export default RecommendWrite;