import React from 'react';
import Layout from './components/Layout';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Home from './components/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from 'react-router-dom';

const About = React.lazy(() => import('./components/About'));
const Blog = React.lazy(() => import('./components/Blog'));

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
        <React.Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route path="/blog" component={Blog}></Route>
            <Route path="/about" component={About}></Route>
          </Switch>
        </React.Suspense>
      </Router>
    </ThemeProvider>
  );
}
