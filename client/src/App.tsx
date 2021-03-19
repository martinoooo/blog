import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import './App.less';

const Blog = React.lazy(() => import('./pages/Blog'));
const About = React.lazy(() => import('./pages/About'));

function App() {
  return (
    <div className="App">
      <Router>
        <header className="header">
          <div className="name">
            <Link to="/">
              <h1>MARTIN</h1>
            </Link>
          </div>
          <div className="navigation">
            <nav>
              <Link to="/blog">Blog</Link>
              <Link to="/about">About</Link>
            </nav>
          </div>
        </header>
        <main className="main">
          <React.Suspense
            fallback={
              <div style={{ marginLeft: '50%', marginTop: '20px' }}>
                {/* <CircularProgress /> */}
              </div>
            }
          >
            <Switch>
              <Route exact path="/" component={Home}></Route>
              <Route path="/blog" component={Blog}></Route>
              <Route path="/about" component={About}></Route>
            </Switch>
          </React.Suspense>
        </main>
      </Router>
    </div>
  );
}

export default App;
