import React from 'react';
import Header from './components/Header';
import ClassificationForm from './components/ClassificationForm';
import './styles/global.css';

function App() {
  return (
    <div className="App">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <ClassificationForm />
      </main>
    </div>
  );
}

export default App;
