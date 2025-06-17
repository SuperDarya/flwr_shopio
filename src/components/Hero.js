import React from 'react';
import './Hero.css';
import { Link } from 'react-router-dom';
// import waIcon from '../images/wa.png';
import numIcon from '../images/num.png';
import cartImage from '../images/корзина.png';
import { useCart } from '../context/CartContext';

const Hero = () => {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <section className="hero">
      <div className="title-container">
        <h1 className="shop-title">lover flower</h1>
      </div>
      <div className="hero-social-icons">
        {/* <a href="#" className="social-icon"><img src={waIcon} alt="WhatsApp" /></a> */}
        <a href="tel:+79877383979" className="social-icon"><img src={numIcon} alt="Phone" /></a>
        <a href="tel:+79877383979" className="hero-phone">+7 (987) 738-39-79</a>
      </div>
      <p className="slogan">Создаём для тех, кто ценит свежесть и изящество цветов</p>
      <Link to="/catalog" className="catalog-btn">смотреть каталог</Link>
      <Link to="/cart" className="cart-link">
        <div className="cart-wrapper">
          <img src={cartImage} alt="Корзина" className="cart-image" />
          {totalItems > 0 && <span className="cart-counter">{totalItems}</span>}
        </div>
      </Link>
    </section>
  );
};

export default Hero; 