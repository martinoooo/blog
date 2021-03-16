import React, { useEffect, useState } from 'react';
import {
  createStyles,
  Theme,
  makeStyles,
  List,
  ListItem,
  ListItemText,
  Collapse,
} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { ISelectArticle, IFolder } from '../../../definetions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    nested: {
      paddingLeft: theme.spacing(4),
    },
  }),
);

interface IProps {
  text: string;
  node: IFolder[];
  select?: ISelectArticle;
  handleSelect: (name: string) => void;
}

export default function ({ text, node, handleSelect, select }: IProps) {
  const classes = useStyles({});
  const [open, setOpen] = useState(true);

  const handleExpand = () => {
    setOpen(!open);
  };

  const handleListItemClick = (name: string) => {
    handleSelect(name);
  };

  return (
    <>
      <ListItem button onClick={handleExpand}>
        <ListItemText primary={text} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto">
        <List component="div" disablePadding>
          {node.map((article: IFolder) => (
            <ListItem
              key={article.name}
              button
              className={classes.nested}
              onClick={() => handleListItemClick(article.path)}
              selected={
                select && select.folder === text && select.name === article.path
              }
            >
              <ListItemText primary={article.name} />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  );
}
