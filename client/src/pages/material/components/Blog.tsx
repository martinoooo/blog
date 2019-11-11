import React, { useEffect, useState } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { getArticleList } from '../../../api';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from './ListItem';
import Paper from './Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      margin: 16,
    },
    list: {
      width: 250,
      background: '#eceff1',
      flexShrink: 0,
    },
  }),
);

interface IList {
  [n: string]: string[];
}

export default function MediaCard() {
  const classes = useStyles({});
  const [list, setList] = useState<IList>({});

  useEffect(() => {
    getArticleList().then(res => {
      setList(res);
    });
  }, []);

  return (
    <div className={classes.root}>
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Articles
          </ListSubheader>
        }
        className={classes.list}
      >
        {Object.keys(list).map(n => (
          <ListItem key={n} text={n} node={list[n]} />
        ))}
      </List>
      <Paper />
    </div>
  );
}
