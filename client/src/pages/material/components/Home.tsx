import * as React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
    },
    media: {
      width: '100%',
    },
  }),
);

export default function MediaCard() {
  const classes = useStyles({});

  return (
    <div className={classes.root}>
      <img
        className={classes.media}
        src="https://i.loli.net/2019/11/10/mEBHzkRyYf6UNoS.jpg"
      ></img>
    </div>
  );
}
