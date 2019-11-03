import * as React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import FaceIcon from '@material-ui/icons/Face';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';

export const BLOG_NAME = '城没有门';

export const ROUTER = [
  {
    name: 'Homepage',
    link: '',
    icon: <HomeIcon></HomeIcon>,
  },
  {
    name: 'Blog',
    link: 'blog',
    icon: <LibraryBooksIcon></LibraryBooksIcon>,
  },
  {
    name: 'About',
    link: 'about',
    icon: <FaceIcon></FaceIcon>,
  },
];
