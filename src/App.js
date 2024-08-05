// src/App.js

import React from 'react'; // Import React library
import './App.css'; // Import the CSS file for styling
import Weather from './Weather'; // Import the Weather component

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* Render the Weather component */}
        <Weather />
      </header>
    </div>
  );
}

export default App; // Export the App component as the default export
