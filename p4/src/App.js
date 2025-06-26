import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductList from './PL';
import ProductDetail from './PD';

function App() {
  return (
    <Router>
      <header style={{ background: '#1976d2', padding: '16px' }}>
        <nav style={{ maxWidth: 900, margin: '0 auto', display: 'flex', gap: 16 }}>
          <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>Home</Link>
          <Link to="/products" style={{ color: '#fff', textDecoration: 'none' }}>Products</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={
          <div style={{ maxWidth: 900, margin: '40px auto', padding: 24 }}>
            <h1>Welcome to the Product Store</h1>
            <p>Browse our products using the navigation above.</p>
          </div>
        } />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        {/* Optional: 404 Route */}
        <Route path="*" element={
          <div style={{ maxWidth: 900, margin: '40px auto', padding: 24 }}>
            <h2>404 - Page Not Found</h2>
            <Link to="/">Go Home</Link>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
