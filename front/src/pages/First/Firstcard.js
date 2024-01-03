import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
const getCookieValue = (name) => (
  document.cookie.split('; ').find(row => row.startsWith(name + '='))
  ?.split('=')[1]
);
const ImgMediaCard = ({ id, title, text, imagePath, likeStatus }) => {
  console.log('likeStatus:', likeStatus);
  console.log('userId:', id);
  const userId = getCookieValue('nickname'); // 쿠키에서 userId 가져오기
  const [liked, setLiked] = useState(likeStatus.includes(userId)); // userId는 현재 로그인한 사용자의 ID

  const handleLike = async () => {
    const csrfToken = getCookieValue('csrftoken');
    setLiked(!liked);
    try {
      const response = await fetch(`http://127.0.0.1:8000/user/crawling/${id}/like/`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'X-CSRFToken': csrfToken, // 헤더에 CSRF 토큰 추가
        },
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      // 서버 응답 처리 (선택적)
    } catch (error) {
      console.error('Failed to like/unlike:', error);
    }
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      {imagePath && <CardMedia component="img" alt={title} height="140" image={imagePath} />}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {text}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleLike}>
          {liked ? <FavoriteIcon color="error" /> : <FavoriteIcon />}
          LIKE
        </Button>
      </CardActions>
    </Card>
  );
};

export default ImgMediaCard;
