import { ReactElement } from 'react';

export const BLOG_NAME = '城没有门';

type INav = Array<{
  name: string;
  link: string;
  icon?: ReactElement;
}>;

export const NAV: INav = [
  {
    name: 'Homepage',
    link: '/',
  },
  {
    name: 'Blog',
    link: '/blog',
  },
  {
    name: 'About',
    link: '/about',
  },
  {
    name: 'Change UI',
    link: '/ui',
  },
];
