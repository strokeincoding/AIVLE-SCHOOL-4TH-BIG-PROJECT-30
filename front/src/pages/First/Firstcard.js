import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite'; // 좋아요 아이콘 추가

const ImgMediaCard = ({ title, text, buttonText, imagePath }) => {
  const [liked, setLiked] = useState(false); // 좋아요 상태 관리

  const handleLike = () => {
    setLiked(!liked); // 좋아요 상태 토글
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      {imagePath && (
        <CardMedia
          component="img"
          alt={title}
          height="140"
          image={imagePath}
        />
      )}
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
          {liked ? <FavoriteIcon color="error" /> : <FavoriteIcon />} {/* 좋아요 상태에 따라 아이콘 색상 변경 */}
          {buttonText}
        </Button>
      </CardActions>
    </Card>
  );
};

export default ImgMediaCard;
