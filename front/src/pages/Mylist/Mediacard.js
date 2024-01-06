import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
 
 
const cardMediaStyles = `
@keyframes wobble {
  0%, 100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(-1deg);
  }
  50% {
    transform: rotate(3deg);
  }
  75% {
    transform: rotate(-1deg);
  }
}
 
.card-media:hover {
  animation: wobble 0.5s infinite;
}
`;
 
const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '…';
  }
  return text;
};
// 여기에 onMoreClick을 추가합니다
const ImgMediaCard = ({ title, text, buttonText, imagePath, onMoreClick }) => {
  return (
    <>
      <style>{cardMediaStyles}</style>
      <Card sx={{ maxWidth: 1200, margin: '15px', boxShadow: 3 }}>
        {imagePath && (
          <CardMedia
            component="img"
            alt={title}
            height="350"
            image={imagePath}
            sx={{ objectFit: "contain" }} // 이미지를 컨테이너에 맞추되, 비율 유지
            className="card-media" // 이 클래스를 추가하여 hover 효과를 적용
          />
        )}
        <CardContent>
        <Typography gutterBottom variant="h5" component="div">
         {truncateText(title, 10)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          {truncateText(text, 20)}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={onMoreClick}>{buttonText}</Button>
        </CardActions>
      </Card>
    </>
  );
};
export default ImgMediaCard;