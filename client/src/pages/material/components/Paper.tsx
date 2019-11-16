import React, { useEffect, useState, useRef } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { getArticle } from '../../../api';
import Paper from '@material-ui/core/Paper';
import { ISelectArticle } from '../../../definetions';
import ReactMarkdown from 'react-markdown';
import hljs from 'highlight.js';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      flex: 'auto',
      margin: '0 16px',
      padding: '20px',
    },
  }),
);

interface IProps {
  selectArticle: ISelectArticle;
}

export default function MediaCard({ selectArticle }: IProps) {
  const classes = useStyles({});
  const [article, setArticle] = useState('');
  const articeEle = useRef(null);

  useEffect(() => {
    if (selectArticle) {
      getArticle(selectArticle).then(res => {
        setArticle(res);
        // hljs.highlightBlock(articeEle.current);
      });
    }
  }, [selectArticle]);

  return (
    <Paper className={classes.paper}>
      <div ref={articeEle}>
        <ReactMarkdown source={article}></ReactMarkdown>
      </div>
    </Paper>
  );
}
