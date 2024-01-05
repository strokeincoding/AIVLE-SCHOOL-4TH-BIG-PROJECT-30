import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
 
// 여기에 onMoreClick을 추가합니다
const ImgMediaCard = ({ title, text, buttonText, imagePath, onMoreClick }) => {
  return (
    <Card sx={{ maxWidth: 1200 }}>
      {imagePath && (
        <CardMedia
          component="img"
          alt={title}
          height="800"
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
        {/* onMoreClick을 onClick 이벤트 핸들러로 사용합니다 */}
        <Button size="small" onClick={onMoreClick}>{buttonText}</Button>
      </CardActions>
    </Card>
  );
};
 
export default ImgMediaCard;