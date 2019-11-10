import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import GitHubIcon from '@material-ui/icons/GitHub';
import Link from '@material-ui/core/Link';

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
            image="https://i.loli.net/2019/11/10/gq52prZTHItSuwA.gif"
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
