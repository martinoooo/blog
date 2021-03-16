import React from 'react';
import {
  makeStyles,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
// import Link from '@material-ui/core/Link';

const useStyles = makeStyles({
  root: {},
  card: {
    maxWidth: 345,
    margin: '100px auto',
  },
  link: {},
});

export default function ImgMediaCard() {
  const classes = useStyles({});
  const goTo = (href: string) => {
    window.open(href);
  };

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="I love U"
            height="175"
            image="https://i.loli.net/2020/05/30/T7pf8PLZCkq3nFu.jpg"
            title="I love U"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Martin
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              The past and the future merge to meet us here.
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => goTo('https://github.com/martinoooo')}
          >
            <GitHubIcon></GitHubIcon>
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
