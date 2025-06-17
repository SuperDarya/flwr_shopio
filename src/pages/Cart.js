import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    getTotalPrice 
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

  return (
    <section className="cart-page">
      <div className="cart-header">
        <h1>Корзина</h1>
        <p>Оформление заказа</p>
      </div>

      <div className="cart-content">
        {cartItems.length > 0 ? (
          <>
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
        ) : (
          <div className="empty-cart">
            <h2>Ваша корзина пуста</h2>
            <p>Добавьте товары из каталога</p>
            <a href="/catalog" className="continue-shopping">Перейти в каталог</a>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart; 