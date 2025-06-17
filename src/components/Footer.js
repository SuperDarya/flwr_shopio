import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import logoImage from '../images/logo.png';
import numIcon from '../images/num.png';
import instIcon from '../images/inst.png'; // Assuming you have an Instagram icon
import waIcon from '../images/wa.png';   // Assuming you have a WhatsApp icon

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-section footer-logo-section">
          <Link to="/">
            <img src={logoImage} alt="LoverFlower" className="footer-logo" />
          </Link>
        </div>

        <div className="footer-section">
          <h4>Навигация</h4>
          <ul className="footer-links">
            <li><Link to="/catalog">Каталог</Link></li>
            <li><Link to="/delivery">Доставка и Оплата</Link></li>
            <li><Link to="/about">О нас</Link></li>
            <li><Link to="/contacts">Контакты</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Контакты</h4>
          <div className="footer-contact-info">
            <p className="phone-number">+7 (987) 738-39-79</p>
            <p>loverflower@mail.ru</p>
            <p>г. Казань, ул. Пушкина, д. 32</p>
            <p>10:00 - 21:00 БЕЗ ВЫХОДНЫХ</p>
          </div>
        </div>

        <div className="footer-section">
          <h4>Корзина</h4>
          <ul className="footer-links">
            <li><Link to="/cart">Перейти в Корзину</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="copyright">© 2025 LoverFlower. Все права защищены.</p>
      </div>
    </footer>
  );
};

export default Footer; 