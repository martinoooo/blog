import * as React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import SideDrawer from './SideDrawer';
import { BLOG_NAME } from '../../../constants';

export default function ButtonAppBar() {
  return (
    <div style={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <SideDrawer />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {BLOG_NAME}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
