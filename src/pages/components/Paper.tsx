import React, { useEffect, useState, useRef } from 'react';
import { Paper, LinearProgress } from '@mui/material';
import { getArticle } from '../../api';
import ReactMarkdown from 'react-markdown';

interface IProps {
  selectArticle?: string;
}

export default function MediaCard({ selectArticle }: IProps) {
  const [article, setArticle] = useState('');
  const [loading, setLoading] = useState(false);
  const articeEle = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectArticle) {
      setLoading(true);
      setArticle(getArticle(selectArticle));
      setLoading(false);
    }
  }, [selectArticle]);

  return (
    <Paper
      sx={{
        flex: 'auto',
        margin: '0 16px',
        padding: '20px',
        overflow: 'hidden',
        overflowX: 'scroll',
      }}
    >
      {loading && <LinearProgress />}
      <div ref={articeEle}>
        <ReactMarkdown>{article}</ReactMarkdown>
      </div>
    </Paper>
  );
}
