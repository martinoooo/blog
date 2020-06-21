import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { UI } from '#constants/ui';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    'align-items': 'center',
    height: 'calc( 100vh - 64px)',
    'justify-content': 'space-around',
  },
  card: {
    width: 345,
  },
  link: {},
});

export default function ImgMediaCard() {
  const classes = useStyles({});

  const changeUI = (value: string) => {
    try {
      localStorage.setItem('ui', value);
      window.location.reload();
    } catch (_) {
      //
    }
  };

  return (
    <div className={classes.root}>
      {UI.map(item => (
        <Card
          key={item.value}
          className={classes.card}
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
