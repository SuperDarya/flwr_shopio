// Страница корзины (Cart)
import React from 'react';
import './Cart.css'; // Стили для корзины
import { useCart } from '../context/CartContext'; // Контекст корзины
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  // Получаем состояние и методы корзины
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    getTotalPrice,
    clearCart,
    getTotalItems
  } = useCart();
  const navigate = useNavigate();

  const formatPrice = (price) => {
    return typeof price === 'number' 
      ? price.toLocaleString() 
      : parseFloat(price.toString().replace(/[^\d.]/g, '')).toLocaleString();
  };

  const handleCheckout = () => {
    navigate('/order-placement');
  };

  // Подсчёт общей стоимости товаров
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  return (
    <section className="cart-page">
      <div className="cart-header">
        <h1>Корзина</h1>
        <p>Оформление заказа</p>
      </div>

      <div className="cart-content">
        {/* Если корзина пуста */}
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <h2>Ваша корзина пуста</h2>
            <p>Добавьте товары из каталога</p>
            <a href="/catalog" className="continue-shopping">Перейти в каталог</a>
          </div>
        ) : (
          <>
            {/* Список товаров в корзине */}
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="cart-item-details">
                    <h3>{item.name}</h3>
                    <div className="cart-item-price">{formatPrice(item.price)} ₽</div>
                    <div className="cart-item-quantity">
                      <button 
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button 
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button 
                    className="remove-item"
                    onClick={() => removeFromCart(item.id)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="summary-row">
                <span>Товары ({cartItems.length})</span>
                <span>{formatPrice(getTotalPrice())} ₽</span>
              </div>
              <div className="summary-row">
                <span>Доставка</span>
                <span>Бесплатно</span>
              </div>
              <div className="summary-row total">
                <span>Итого</span>
                <span>{formatPrice(getTotalPrice())} ₽</span>
              </div>
              <button className="checkout-btn" onClick={handleCheckout}>Оформить заказ</button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Cart; 