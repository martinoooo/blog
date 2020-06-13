import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import { NAV } from '../constants';

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  list: {
    width: 250,
  },
}));

export default function SideDrawer() {
  const classes = useStyles({});
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
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {NAV.map((link, index) => (
          <ListItem
            button
            component={Link}
            to={{
              pathname: link.link,
              search: window.location.search,
            }}
            key={link.name}
          >
            <ListItemIcon>{link.icon}</ListItemIcon>
            <ListItemText primary={link.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <IconButton
        edge="start"
        className={classes.menuButton}
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
