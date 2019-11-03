import * as React from 'react';
import Layout from './components/Layout';
import { createMuiTheme } from '@material-ui/core/styles';
import { indigo } from '@material-ui/core/colors';
import { ThemeProvider } from '@material-ui/styles';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from 'react-router-dom';

const theme = createMuiTheme({
  palette: {
    primary: indigo,
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout></Layout>
      </Router>
    </ThemeProvider>
  );
}
