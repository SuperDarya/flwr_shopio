import React from 'react';
import './Catalog.css';

const Catalog = () => {
  return (
    <section className="catalog-section">
      <div className="catalog-bg-elements">
        <div className="ellipse ellipse-1"></div>
        <div className="ellipse ellipse-2"></div>
      </div>
      
      <div className="catalog-container">
        <h2>Каталог</h2>
        <p className="catalog-description">
          В нашем магазине самый большой выбор цветов, букетов, открыток и подарков.
          Мы всегда поможем вам подобрать то, что нужно, и быстро доставим по любому адресу.
        </p>
        
        <div className="category-grid">
          <div className="category-block">
            <h3>Цветы</h3>
            <ul className="category-list">
              <li><a href="#">Сборные букеты</a></li>
              <li><a href="#">Монобукеты</a></li>
              <li><a href="#">Розы</a></li>
              <li><a href="#">Тюльпаны</a></li>
              <li><a href="#">Пионы</a></li>
            </ul>
            <a href="#" className="catalog-link">смотреть все</a>
          </div>
          
          <div className="category-block dried-block">
            <h3>Сухоцветы</h3>
            <ul className="category-list">
              <li><a href="#">Букеты</a></li>
              <li><a href="#">Композиции</a></li>
              <li><a href="#">Для интерьера</a></li>
              <li><a href="#">Свадебные</a></li>
            </ul>
            <a href="#" className="catalog-link">смотреть все</a>
          </div>
          
          <div className="category-block additional-block">
            <h3>Дополнительно</h3>
            <ul className="category-list">
              <li><a href="#">Шары</a></li>
              <li><a href="#">Игрушки</a></li>
              <li><a href="#">Открытки</a></li>
              <li><a href="#">Подарки</a></li>
              <li><a href="#">Корзины</a></li>
            </ul>
            <a href="#" className="catalog-link">смотреть все</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Catalog; 