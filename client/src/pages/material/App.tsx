import React from 'react';
import Layout from './components/Layout';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Home from './components/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './index.less';

const About = React.lazy(() => import('./components/About'));
const Blog = React.lazy(() => import('./components/Blog'));
const UI = React.lazy(() => import('./components/Ui'));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#000',
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout></Layout>
        <React.Suspense
          fallback={
            <div style={{ marginLeft: '50%', marginTop: '20px' }}>
              <CircularProgress />
            </div>
          }
        >
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route path="/blog" component={Blog}></Route>
            <Route path="/about" component={About}></Route>
            <Route path="/ui" component={UI}></Route>
          </Switch>
        </React.Suspense>
      </Router>
    </ThemeProvider>
  );
}
