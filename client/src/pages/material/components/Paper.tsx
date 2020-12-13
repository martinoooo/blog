import React, { useEffect, useState, useRef } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { getArticle } from '../../../api';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';
import ReactMarkdown from 'react-markdown';
import hljs from 'highlight.js';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      flex: 'auto',
      margin: '0 16px',
      padding: '20px',
      overflow: 'hidden',
      'overflow-x': 'scroll'
    },
  }),
);

interface IProps {
  selectArticle: string;
}

export default function MediaCard({ selectArticle }: IProps) {
  const classes = useStyles({});
  const [article, setArticle] = useState('');
  const [loading, setLoading] = useState(false);
  const articeEle = useRef(null);

  useEffect(() => {
    if (selectArticle) {
      setLoading(true);
      getArticle(selectArticle)
        .then(res => {
          setArticle(res);
          // hljs.highlightBlock(articeEle.current);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [selectArticle]);

  return (
    <Paper className={classes.paper}>
      {loading && <LinearProgress />}
      <div ref={articeEle}>
        <ReactMarkdown source={article}></ReactMarkdown>
      </div>
    </Paper>
  );
}
