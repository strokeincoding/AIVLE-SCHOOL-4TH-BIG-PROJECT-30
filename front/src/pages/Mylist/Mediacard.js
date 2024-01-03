import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const ImgMediaCard = ({ title, text, buttonText, imagePath }) => {
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
        <Button size="small">{buttonText}</Button>
      </CardActions>
    </Card>
  );
};

export default ImgMediaCard;