import React from 'react';
import Header from './components/Header';
import Classifier from './components/Classifier';
import './styles/global.css';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Classifier />
      </main>
    </div>
  );
}

export default App;
