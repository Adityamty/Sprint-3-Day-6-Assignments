import React, { createContext, useReducer, useEffect } from 'react';

export const CartContext = createContext();

const initialState = {
  cart: JSON.parse(localStorage.getItem('cartItems')) || [],
  updating: null,
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existing = state.cart.find(item => item.id === action.payload.id);
      let updatedCart;
      if (existing) {
        updatedCart = state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [...state.cart, { ...action.payload, quantity: 1 }];
      }
      return { ...state, cart: updatedCart };
    }
    case 'INCREMENT': {
      return {
        ...state,
        updating: action.payload,
        cart: state.cart.map(item =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    }
    case 'DECREMENT': {
      return {
        ...state,
        updating: action.payload,
        cart: state.cart.map(item =>
          item.id === action.payload && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };
    }
    case 'REMOVE_FROM_CART': {
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload),
      };
    }
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    case 'UPDATE_DONE':
      return { ...state, updating: null };
    default:
      return state;
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(state.cart));
  }, [state.cart]);

  const addToCart = (item) => dispatch({ type: 'ADD_TO_CART', payload: item });
  const increment = (id) => {
    dispatch({ type: 'INCREMENT', payload: id });
    setTimeout(() => dispatch({ type: 'UPDATE_DONE' }), 400);
  };
  const decrement = (id) => {
    dispatch({ type: 'DECREMENT', payload: id });
    setTimeout(() => dispatch({ type: 'UPDATE_DONE' }), 400);
  };
  const removeFromCart = (id) => dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const getCartTotal = () =>
    state.cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        updating: state.updating,
        addToCart,
        increment,
        decrement,
        removeFromCart,
        clearCart,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
