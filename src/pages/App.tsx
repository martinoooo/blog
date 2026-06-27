import React from 'react';
import Layout from './components/Layout';
import { CircularProgress } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Home from './components/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.less';

const About = React.lazy(() => import('./components/About'));
const Blog = React.lazy(() => import('./components/Blog'));

const theme = createTheme({
  palette: {
    primary: {
      main: '#000',
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Layout />
        <React.Suspense
          fallback={
            <div style={{ marginLeft: '50%', marginTop: '20px' }}>
              <CircularProgress />
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </React.Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
}
