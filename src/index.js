import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import { BrowserRouter as Router } from 'react-router-dom'; // Import Router
import App from './App';
import "./index.css"

// Get the root element
const rootElement = document.getElementById('root');

// Create the root
const root = createRoot(rootElement);

// Render the App component inside the Router
root.render(
  <Router>
    <App />
  </Router>
);
