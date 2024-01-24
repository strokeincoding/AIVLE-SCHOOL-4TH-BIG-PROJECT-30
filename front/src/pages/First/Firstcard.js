import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';



const getCookieValue = (name) => (
  document.cookie.split('; ').find(row => row.startsWith(name + '='))
  ?.split('=')[1]
);
 
const ImgMediaCard = ({ id, title, text, imagePath, like, url }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(like); 
  const [userId, setUserId] = useState(null);
  const token = localStorage.getItem('token');
  const nickname = getCookieValue('nickname');
 
  const summaryLength = 200; 
  const [isTextTooLong, setIsTextTooLong] = useState(text.length > summaryLength);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const userResponse = await axios.get('http://127.0.0.1:8000/user/User/', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const user = userResponse.data.find(user => user.nickname === nickname);
        if (user) {
          setUserId(user.id);
        }
      } catch (error) {
        console.error(error);
      }
    };
 
    fetchUserId();
  }, [nickname, token]);
 
  useEffect(() => {
    const fetchLikes = async () => {
      try {
        if (userId) {
          const likeResponse = await axios.get('http://127.0.0.1:8000/crawling/like/', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          const isLiked = likeResponse.data.some(like => like.user === userId && like.crawling === id);
          console.log(isLiked);
          setLiked(isLiked);
         
        }
      } catch (error) {
        console.error(error);
      }
    };
 
    fetchLikes();
  }, [id, userId, token]);

  useEffect(() => {
    setIsTextTooLong(text.length > summaryLength);
  }, [text, summaryLength]);
 
  const toggleLike = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/crawling/like/', {
        user: userId,
        crawling: id,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
 
      setLiked(!liked);
      setLikeCount(liked ? likeCount - 1 : likeCount + 1); 
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleReadMore = () => {
    window.location.href = url; 
  };
 
  return (
  <Box sx={{ display: 'flex', justifyContent: 'center', m: 2 }}>
    <Card sx={{maxWidth: 345, boxShadow: 3, display: 'flex', flexDirection: 'column', height: '100%' }}>
      {imagePath && (
        <CardMedia 
        component="img" 
        alt={title} 
        height="140" 
        image={imagePath}   
        sx={{ objectFit:'cover'}} 
        />
      )}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {isTextTooLong ? `${text.substring(0, summaryLength)}...` : text}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'center' }}>
        <IconButton aria-label="add to favorites" onClick={toggleLike}>
          <FavoriteIcon color={liked ? 'error' : 'default'} />
        </IconButton>
        <Typography component="span">
          {likeCount} Likes 
        </Typography>
        <Button size="small" onClick={handleReadMore}>
            MORE
        </Button>
      </CardActions>
    </Card>
  </Box>
  );
};
 
export default ImgMediaCard;
 