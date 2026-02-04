import React from 'react';
import notes from './notes';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1></h1>
      </header>
      <main>
        <pre style={{ whiteSpace: 'pre-wrap', textAlign: 'left' }}>
          {notes}
        </pre>
      </main>
    </div>
  );
}

export default App;