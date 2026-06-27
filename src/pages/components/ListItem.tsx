import React, { useState } from 'react';
import {
  List,
  ListItemButton,
  ListItemText,
  Collapse,
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { ISelectArticle, IFolder } from '../../definetions';

interface IProps {
  text: string;
  node: IFolder[];
  select?: ISelectArticle;
  handleSelect: (name: string) => void;
}

export default function ({ text, node, handleSelect, select }: IProps) {
  const [open, setOpen] = useState(true);

  const handleExpand = () => {
    setOpen(!open);
  };

  const handleListItemClick = (name: string) => {
    handleSelect(name);
  };

  return (
    <>
      <ListItemButton onClick={handleExpand}>
        <ListItemText primary={text} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto">
        <List component="div" disablePadding>
          {node.map((article: IFolder) => (
            <ListItemButton
              key={article.name}
              sx={{ pl: 4 }}
              onClick={() => handleListItemClick(article.path)}
              selected={
                select && select.folder === text && select.name === article.path
              }
            >
              <ListItemText primary={article.name} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </>
  );
}
