import { NAV as nav } from '../../../constants';
import * as React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import FaceIcon from '@mui/icons-material/Face';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import SettingsInputSvideoIcon from '@mui/icons-material/SettingsInputSvideo';

const icon: {
  [n: string]: React.ReactElement;
} = {
  Homepage: <HomeIcon />,
  Blog: <LibraryBooksIcon />,
  About: <FaceIcon />,
  'Change UI': <SettingsInputSvideoIcon />,
};

export const NAV = nav.map(n => ({ ...n, icon: icon[n.name] }));
