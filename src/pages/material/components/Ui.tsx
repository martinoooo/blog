import React from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { UI } from '#constants/ui';

export default function ImgMediaCard() {
  const changeUI = (value: string) => {
    try {
      localStorage.setItem('ui', value);
      window.location.reload();
    } catch (_) {
      //
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        height: 'calc(100vh - 64px)',
        justifyContent: 'space-around',
      }}
    >
      {UI.map((item) => (
        <Card
          key={item.value}
          sx={{ width: 345 }}
          onClick={() => changeUI(item.value)}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              alt={item.name}
              height="175"
              image={item.img}
              title={item.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {item.name}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </div>
  );
}
