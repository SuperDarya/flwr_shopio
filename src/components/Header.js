import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logoImage from '../images/logo.png';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleMenuToggle();
    }
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="site-header">
      <div className="top-bar">
        <div className="logo">
          <Link to="/" onClick={handleLinkClick}>
            <img src={logoImage} alt="LoverFlower" />
          </Link>
        </div>
        <button 
          className="mobile-menu-button"
          onClick={handleMenuToggle}
          onKeyDown={handleKeyDown}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span className={`menu-icon ${isMenuOpen ? 'open' : ''}`}></span>
        </button>
        <nav className={`nav-block ${isMenuOpen ? 'active' : ''}`}>
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