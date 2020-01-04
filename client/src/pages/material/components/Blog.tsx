import React, { useEffect, useState } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { getArticleList } from '../../../api';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from './ListItem';
import Paper from './Paper';
import { ISelectArticle, IFolders } from '../../../definetions';

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

export default function MediaCard() {
  const classes = useStyles({});
  const [list, setList] = useState<IFolders[]>([]);
  const [selectArticle, setSelectArticle] = useState<ISelectArticle>(null);

  useEffect(() => {
    getArticleList().then(res => {
      setList(res);
      const folder = res[0];
      setSelectArticle({
        folder: folder.name,
        name: folder.children[0].path,
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
        {list.map(folder => (
          <ListItem
            key={folder.name}
            text={folder.name}
            node={folder.children}
            handleSelect={(name: string) => handleSelect(folder.name, name)}
            select={selectArticle}
          />
        ))}
      </List>
      <Paper selectArticle={selectArticle && selectArticle.name} />
    </div>
  );
}
