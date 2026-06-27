import React, { useEffect, useState } from 'react';
import { CircularProgress, List } from '@mui/material';
import { getArticleList } from '../../../api';
import ListItem from './ListItem';
import Paper from './Paper';
import { ISelectArticle, IFolders } from '../../../definetions';

export default function MediaCard() {
  const [list, setList] = useState<IFolders[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectArticle, setSelectArticle] = useState<
    ISelectArticle | undefined
  >();

  useEffect(() => {
    const res = getArticleList();
    setList(res);
    const folder = res[0];
    setSelectArticle({
      folder: folder.name,
      name: folder.children[0].path,
    });
    setLoading(false);
  }, []);

  const handleSelect = (folder: string, name: string) => {
    setSelectArticle({
      folder,
      name,
    });
  };

  return (
    <div style={{ display: 'flex', margin: 16, justifyContent: 'center' }}>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            sx={{ width: 250, background: '#eceff1', flexShrink: 0 }}
          >
            {list.map((folder) => (
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
        </>
      )}
    </div>
  );
}
