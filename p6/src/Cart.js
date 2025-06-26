import React, { useContext } from 'react';
import { CartContext } from './CartContext';

function Cart() {
  const {
    cart,
    updating,
    increment,
    decrement,
    removeFromCart,
    clearCart,
    getCartTotal,
  } = useContext(CartContext);

  if (cart.length === 0) {
    return (
      <div style={{ maxWidth: 700, margin: '40px auto', padding: 24 }}>
        <h2>Your Cart is Empty</h2>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 700, margin: '40px auto', padding: 24 }}>
      <h2>Your Shopping Cart</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {cart.map(item => (
          <li key={item.id} style={{ marginBottom: 16, borderBottom: '1px solid #ddd', paddingBottom: 8 }}>
            <h3>{item.title}</h3>
            <p>Price: ${item.price}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <button
                onClick={() => decrement(item.id)}
                disabled={item.quantity === 1 || updating === item.id}
              >-</button>
              <span>{item.quantity}</span>
              <button
                onClick={() => increment(item.id)}
                disabled={updating === item.id}
              >+</button>
              <button
                onClick={() => removeFromCart(item.id)}
                disabled={updating === item.id}
                style={{ marginLeft: 16 }}
              >Remove</button>
            </div>
            <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
          </li>
        ))}
      </ul>
      <h3>Total: ${getCartTotal().toFixed(2)}</h3>
      <button onClick={clearCart} style={{ marginTop: 16 }}>Clear Cart</button>
    </div>
  );
}

export default Cart;
