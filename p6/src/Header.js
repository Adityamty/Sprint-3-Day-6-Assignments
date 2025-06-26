import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import { Link } from 'react-router-dom';

function Header() {
  const { cart } = useContext(CartContext);
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header style={{ background: '#1976d2', padding: '16px', color: '#fff' }}>
      <nav style={{ maxWidth: 900, margin: '0 auto', display: 'flex', justifyContent: 'space-between' }}>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>Products</Link>
        <Link to="/cart" style={{ color: '#fff', textDecoration: 'none' }}>
          Cart ({totalQuantity})
        </Link>
      </nav>
    </header>
  );
}

export default Header;
