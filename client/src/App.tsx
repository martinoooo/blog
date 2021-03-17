import React from 'react';
import './App.less';

function App() {
  return (
    <div className="App">
      <header className="header">
        <div className="name">
          <a href="/">
            <h1>MARTIN</h1>
          </a>
        </div>
        <div className="navigation">
          <nav>
            <a href="/blog">Blog</a>
            <a href="/note">Note</a>
            <a href="/project">Project</a>
            <a href="/about">About</a>
          </nav>
        </div>
      </header>
      <main className="main">
        <section className="introduce">
          <h1>Hi. 🥳 </h1>
          <h3>Hello World.</h3>
        </section>
      </main>
    </div>
  );
}

export default App;
