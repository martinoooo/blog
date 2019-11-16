import React, { useEffect, useState } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { getArticleList } from '../../../api';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from './ListItem';
import Paper from './Paper';
import { ISelectArticle } from '../../../definetions';

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
  const [selectArticle, setSelectArticle] = useState<ISelectArticle>(null);

  useEffect(() => {
    getArticleList().then(res => {
      setList(res);
      const folder = Object.keys(res)[0];
      setSelectArticle({
        folder,
        name: res[folder][0],
      });
    });
  }, []);

  const handleSelect = (folder: string, name: string) => {
    setSelectArticle({
      folder,
      name,
    });
  };

  return (
    <div className={classes.root}>
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        className={classes.list}
      >
        {Object.keys(list).map(folder => (
          <ListItem
            key={folder}
            text={folder}
            node={list[folder]}
            handleSelect={(name: string) => handleSelect(folder, name)}
            select={selectArticle}
          />
        ))}
      </List>
      <Paper selectArticle={selectArticle} />
    </div>
  );
}
