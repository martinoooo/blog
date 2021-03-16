import { NAV as nav } from '../../../constants';
import * as React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import FaceIcon from '@material-ui/icons/Face';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import SettingsInputSvideoIcon from '@material-ui/icons/SettingsInputSvideo';

const icon: {
  [n: string]: React.ReactElement;
} = {
  Homepage: <HomeIcon></HomeIcon>,
  Blog: <LibraryBooksIcon></LibraryBooksIcon>,
  About: <FaceIcon></FaceIcon>,
  'Change UI': <SettingsInputSvideoIcon></SettingsInputSvideoIcon>,
};

export const NAV = nav.map(n => ({ ...n, icon: icon[n.name] }));
