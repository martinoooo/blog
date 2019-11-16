import React, { useEffect, useState } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { ISelectArticle } from '../../../definetions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    nested: {
      paddingLeft: theme.spacing(4),
    },
  }),
);

interface IProps {
  text: string;
  node: string[];
  select: ISelectArticle;
  handleSelect: (name: string) => void;
}

export default function({ text, node, handleSelect, select }: IProps) {
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
          {node.map(name => (
            <ListItem
              key={name}
              button
              className={classes.nested}
              onClick={() => handleListItemClick(name)}
              selected={
                select && select.folder === text && select.name === name
              }
            >
              <ListItemText primary={name} />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  );
}
