import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logoImage from '../images/logo.png';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  const handleLinkClick = () => {};

  return (
    <header className="site-header">
      <div className="top-bar">
        <div className="logo">
          <Link to="/" onClick={handleLinkClick}>
            <img src={logoImage} alt="LoverFlower" />
          </Link>
        </div>
        <nav className="nav-block">
          <ul className="nav-links">
            <li><Link to="/catalog" onClick={handleLinkClick}>Каталог</Link></li>
            <li><Link to="/delivery" onClick={handleLinkClick}>Доставка и оплата</Link></li>
            <li><Link to="/about" onClick={handleLinkClick}>О нас</Link></li>
            <li><Link to="/contacts" onClick={handleLinkClick}>Контакты</Link></li>
            <li><Link to="/faq" onClick={handleLinkClick}>FAQ</Link></li>
            <li>
              <Link to="/cart" className="cart-link" onClick={handleLinkClick}>
                Корзина
                {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header; 