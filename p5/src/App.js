import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './CartContext';
import Header from './Header';
import Cart from './Cart';
import ProductList from './ProductList';
import ProductDetail from './ProductDetail';

function App() {
  return (
    <CartProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          {/* Add other routes as needed */}
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
