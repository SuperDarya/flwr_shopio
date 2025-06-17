import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    console.log('CartContext: Adding product:', product);
    console.log('Current cart items:', cartItems);
    
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      console.log('Existing item:', existingItem);
      
      if (existingItem) {
        const newItems = prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        console.log('Updated cart items:', newItems);
        return newItems;
      }
      
      const newItems = [...prevItems, { ...product, quantity: 1 }];
      console.log('New cart items:', newItems);
      return newItems;
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      // Убедимся, что price это число
      const price = typeof item.price === 'string' 
        ? parseFloat(item.price.replace(/[^\d.]/g, '')) 
        : item.price;
      console.log(`Item ${item.id} total:`, price * item.quantity);
      return total + (price * item.quantity);
    }, 0);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}; 