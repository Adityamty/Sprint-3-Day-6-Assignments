import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import { Link } from 'react-router-dom';

function Cart() {
  const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } = useContext(CartContext);

  if (cartItems.length === 0) {
    return (
      <div style={{ maxWidth: 700, margin: '40px auto', padding: 24 }}>
        <h2>Your Cart is Empty</h2>
        <Link to="/products">Go to Products</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 700, margin: '40px auto', padding: 24 }}>
      <h2>Your Shopping Cart</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {cartItems.map(item => (
          <li key={item.id} style={{ marginBottom: 16, borderBottom: '1px solid #ddd', paddingBottom: 8 }}>
            <h3>{item.title}</h3>
            <p>Price: ${item.price}</p>
            <p>Quantity: {item.quantity}</p>
            <button onClick={() => removeFromCart(item)} style={{ marginRight: 8 }}>-</button>
            <button onClick={() => addToCart(item)}>+</button>
          </li>
        ))}
      </ul>
      <h3>Total: ${getCartTotal().toFixed(2)}</h3>
      <button onClick={clearCart} style={{ marginTop: 16 }}>Clear Cart</button>
    </div>
  );
}

export default Cart;
