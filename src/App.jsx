import React from 'react';
import './App.css';
import Estimate from './components/Estimate';

const EyeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{verticalAlign: 'middle'}}>
    <ellipse cx="10" cy="10" rx="8" ry="5" stroke="#4CAF50" strokeWidth="2" fill="none"/>
    <circle cx="10" cy="10" r="2" fill="#4CAF50"/>
  </svg>
);

function App() {
  return (
    <div className="App">
      <Estimate EyeIcon={EyeIcon} />
    </div>
  );
}

export default App;
