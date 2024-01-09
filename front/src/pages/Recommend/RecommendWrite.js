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
const TitleField = ({ title, handleInputChange }) => (
<Grid item xs={12}>
  <TextField
    fullWidth
    label="제목"
    id="Title"
    type="text"
    name="title"
    value={title}
    onChange={handleInputChange}
  />
</Grid>
);
 
const CategorySelect = ({ categories, selectedCategories, handleCategoryChange }) => (
<Grid item xs={12}>
  <FormControl fullWidth variant="outlined">
    <InputLabel id="categories-label">모집분야</InputLabel>
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
 
 
 
const TechnologyStackSelect = ({ occupationName, selectedStacks, handleStackChange, technologyStacks }) => (
<Grid item xs={12}>
  <h3>{occupationName}</h3>
  <FormControl fullWidth variant="outlined">
    <InputLabel id="technology-stacks-label">기술 스택</InputLabel>
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
 
 
const EnvSelect = ({ envs, selectedEnv, handleEnvChange }) => (
  <Grid item xs={12}>
    <FormControl fullWidth variant="outlined">
      <InputLabel id="env-label">근무 환경</InputLabel>
      <Select
        labelId="env-label"
        id="env"
        value={selectedEnv}
        onChange={handleEnvChange}
        input={<OutlinedInput label="Work Environment" />}
        name="env"
      >
        {envs.map((env) => (
          <MenuItem key={env.id} value={env.id}>
            {env.env_name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </Grid>
);

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
  image: null,
});
 
 
 
const [categories, setCategories] = useState([]);
const [technologyStacks, setTechnologyStacks] = useState([]); 
const [selectedTechStacks, setSelectedTechStacks] = useState({}); 
const [envs, setEnvs] = useState([]); 
const navigate = useNavigate();
const yourAuthToken = localStorage.getItem('token');
 
const handleStackChange = (occupationId) => (event) => {
  const {
    target: { value },
  } = event;
 
  
  const allSelectedStacks = typeof value === 'string' ? value.split(',') : value;
 
  
  setSelectedTechStacks({
    ...selectedTechStacks,
    [occupationId]: allSelectedStacks,
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
 
const handleEnvChange = (event) => {
  const { value } = event.target;
  setNewPost({ ...newPost, env: value });
};
const handleImageChange = (e) => {
  const file = e.target.files[0]; 
  if (file) {
    setNewPost({ ...newPost, image: file }); 
  }
};
const addPost = async (e) => {
  e.preventDefault();
 
 
 
  const formData = new FormData();
   formData.append('title', newPost.title);
   formData.append('cate', newPost.cate);
   formData.append('Exp_require', newPost.Exp_require);
   formData.append('Project_Description', newPost.Project_Description);
 
   const combinedTechStacks = Object.values(selectedTechStacks).flat();
   const uniqueTechStacks = Array.from(new Set(combinedTechStacks));
   uniqueTechStacks.forEach(stack => formData.append('technology_stacks', stack));
 
   newPost.occupation.forEach(occ => formData.append('occupation', occ));
 
   if (newPost.env) formData.append('env', newPost.env);
 
   if (newPost.image) {
     formData.append('image', newPost.image);
   }
  try {
    const response = await axios.post('http://127.0.0.1:8000/recommend/Recommend/', formData, {
      headers: {
        'Authorization': `Bearer ${yourAuthToken}`,
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
      setCategories(response.data); 
    } catch (error) {
      console.error('Error fetching occupations:', error);
    }
  };
 
  const fetchTechnologyStacks = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/user/TechnologyStack/');
      setTechnologyStacks(response.data); 
    } catch (error) {
      console.error('Error fetching technology stacks:', error);
    }
  };
 
  const fetchEnvs = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/user/Env/');
      setEnvs(response.data); 
    } catch (error) {
      console.error('Error fetching envs:', error);
    }
  };
 
  fetchEnvs();
  fetchOccupations();
  fetchTechnologyStacks();
}, []);
 
return (
  <Wrapper>
    <Container>
      <h1>공모전/해커톤 참가자 모집</h1>
      <form onSubmit={addPost}>
        <Grid container spacing={2}>
          <TitleField title={newPost.title} handleInputChange={handleInputChange} />
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="모집분야 및 인원수"
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
          <EnvSelect
          envs={envs}
          selectedEnv={newPost.env}
          handleEnvChange={handleEnvChange}
        />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="요구사항"
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
              label="설명"
              id="Project_Description"
              type="text"
              name="Project_Description"
              value={newPost.Project_Description}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <input
              type="file"
              accept='image/*'
              name="image"
              onChange={handleImageChange}
            />
          </Grid>
          </Grid>
          <Grid item xs={12}>
        <Button title='Add Post' type="submit" />
        </Grid></form>
    </Container>
  </Wrapper>
);
};
 
export default RecommendWrite;
 