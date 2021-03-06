import * as React from 'react';
import { makeStyles, AppBar, Toolbar, Typography } from '@material-ui/core';
import SideDrawer from './SideDrawer';
import { BLOG_NAME } from '../../../constants';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles({});

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <SideDrawer></SideDrawer>
          <Typography variant="h6" className={classes.title}>
            {BLOG_NAME}
          </Typography>
          {/* <Button color="inherit">Login</Button> */}
        </Toolbar>
      </AppBar>
    </div>
  );
}
