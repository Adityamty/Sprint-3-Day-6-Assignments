import React, { createContext, useReducer, useEffect } from 'react';

export const CartContext = createContext();

const initialState = {
  cartItems: JSON.parse(localStorage.getItem('cartItems')) || []
};

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.cartItems.find(item => item.id === action.payload.id);
      let updatedCart;
      if (existingItem) {
        updatedCart = state.cartItems.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [...state.cartItems, { ...action.payload, quantity: 1 }];
      }
      return { ...state, cartItems: updatedCart };
    }
    case 'REMOVE_FROM_CART': {
      const existingItem = state.cartItems.find(item => item.id === action.payload.id);
      let updatedCart;
      if (existingItem.quantity === 1) {
        updatedCart = state.cartItems.filter(item => item.id !== action.payload.id);
      } else {
        updatedCart = state.cartItems.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      return { ...state, cartItems: updatedCart };
    }
    case 'CLEAR_CART':
      return { ...state, cartItems: [] };
    default:
      return state;
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Persist cart to localStorage
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
  }, [state.cartItems]);

  // Action creators
  const addToCart = (item) => dispatch({ type: 'ADD_TO_CART', payload: item });
  const removeFromCart = (item) => dispatch({ type: 'REMOVE_FROM_CART', payload: item });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const getCartTotal = () =>
    state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems: state.cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
