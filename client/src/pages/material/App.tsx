import * as React from 'react';
import Layout from './components/Layout';
import { createMuiTheme } from '@material-ui/core/styles';
import { indigo } from '@material-ui/core/colors';
import { ThemeProvider } from '@material-ui/styles';
import Home from './components/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from 'react-router-dom';

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
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/blog">
            <div>blog</div>
          </Route>
          <Route path="/about">
            <div>about</div>
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}
