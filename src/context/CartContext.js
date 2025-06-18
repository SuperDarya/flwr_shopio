// Контекст корзины для управления товарами в корзине
import React, { createContext, useContext, useState, useEffect } from 'react';

// Создаём контекст корзины
const CartContext = createContext();

// Провайдер корзины, оборачивает приложение и даёт доступ к корзине всем компонентам
export const CartProvider = ({ children }) => {
  // Состояние: список товаров в корзине
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Добавить товар в корзину
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

  // Удалить товар из корзины по id
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

  // Очистить корзину
  const clearCart = () => {
    setCartItems([]);
  };

  // Получить количество товаров в корзине
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

  // Провайдер отдаёт методы и состояние всем дочерним компонентам
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

// Хук для использования корзины в компонентах
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 