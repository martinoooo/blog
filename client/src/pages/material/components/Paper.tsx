import React, { useEffect, useState } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { getArticle } from '../../../api';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ReactMarkdown from 'react-markdown';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      flex: 'auto',
      margin: '0 16px',
    },
  }),
);

export default function MediaCard() {
  const classes = useStyles({});
  const [article, setArticle] = useState('');

  useEffect(() => {
    getArticle('tech', 'grid.md').then(res => {
      setArticle(res);
    });
  }, []);

  return (
    <Paper className={classes.paper}>
      <ReactMarkdown source={article}></ReactMarkdown>
    </Paper>
  );
}
