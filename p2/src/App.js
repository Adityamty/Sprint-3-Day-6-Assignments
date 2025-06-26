import React from 'react';
import { ThemeProvider } from './ThemeContext';
import ThemeToggle from './ThemeToggle';
import './styles.css';

function App() {
  return (
    <ThemeProvider>
      <div style={{ padding: '40px' }}>
        <h1>Theme Toggle with Context API</h1>
        <ThemeToggle />
        <p>This is a sample page. The theme applies globally!</p>
      </div>
    </ThemeProvider>
  );
}

export default App;
