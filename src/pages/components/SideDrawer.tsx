import * as React from 'react';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { NAV } from '../constants';

const listWidth = 250;

export default function SideDrawer() {
  const [visible, setVisible] = React.useState(false);

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setVisible(open);
  };

  const sideList = () => (
    <div
      style={{ width: listWidth }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {NAV.map((link) => (
          <ListItemButton
            key={link.name}
            component={Link}
            to={link.link}
          >
            <ListItemIcon>{link.icon}</ListItemIcon>
            <ListItemText primary={link.name} />
          </ListItemButton>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <IconButton
        edge="start"
        sx={{ mr: 2 }}
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer(true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer open={visible} onClose={toggleDrawer(false)}>
        {sideList()}
      </Drawer>
    </div>
  );
}
