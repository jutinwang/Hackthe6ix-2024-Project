import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import ClickableSection from './components/ClickableSection';

function App() {
  const [start, setStart] = useState(false);

  const handleStart = () => {
    setStart(true);
  };

  return (
    <div className="app-wrapper">
      {!start && (
        <div className="overlay">
            <div className='titleblock'>
              <div className='maintitle'><h1>Food Guardians</h1></div>
              <div className='maintitle'><h3>By Tolu and Justin</h3></div>
            </div>
          <button className='startButton' onClick={handleStart}>Start</button>
        </div>
      )}
      <div className={`app-container ${!start ? 'blur-background' : ''}`}>
        <div className="App">
          <Navbar />
          <div className="app-body">
            <ClickableSection />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
