// Секция популярных букетов (PopularSection)
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Для перехода к деталям или в корзину
import bouquet1Image from '../images/bouquet1.jpg';
import bouquet2Image from '../images/bouquet2.png';
import bouquet3Image from '../images/bouquet3.png';
import bouquet4Image from '../images/bouquet4.png';
import bouquet5Image from '../images/bouquet5.png';
import bouquet6Image from '../images/bouquet6.jpg';
import bouquet7Image from '../images/bouquet7.jpg';
import bouquet8Image from '../images/bouquet8.png';
import { useCart } from '../context/CartContext'; // Контекст корзины

const PopularSection = () => {
  // Состояние для текущего индекса слайдера
  const [currentIndex, setCurrentIndex] = useState(0);
  const bouquetsGridRef = useRef(null);
  // Получаем методы корзины
  const { cartItems, addToCart } = useCart();

  // Определяем ширину экрана для мобильной версии
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 960);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 960);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Количество карточек в слайдере за раз
  const itemsPerView = 3;

  // Массив популярных букетов
  const popularBouquets = [
    {
      id: 1,
      name: 'НЕЖНОСТЬ',
      price: 9999,
      image: bouquet1Image,
      alt: 'Букет НЕЖНОСТЬ',
      color: 'Красный',
      format: 'Букет',
      flower: 'Розы'
    },
    {
      id: 2,
      name: 'ЭЛЕГАНТНОСТЬ',
      price: 4200,
      image: bouquet7Image,
      alt: 'Букет ЭЛЕГАНТНОСТЬ',
      color: ['Белый', 'Розовый'],
      format: 'Букет',
      flower: ['Розы']
    },
    {
      id: 3,
      name: 'ВЕСЕННЕЕ НАСТРОЕНИЕ',
      price: 3800,
      image: bouquet3Image,
      alt: 'Букет ВЕСЕННЕЕ НАСТРОЕНИЕ',
      color: 'Желтый',
      format: 'Букет',
      flower: 'Тюльпаны'
    },
    {
      id: 4,
      name: 'ЛЕТНИЙ БРИЗ',
      price: 4500,
      image: bouquet4Image,
      alt: 'Букет ЛЕТНИЙ БРИЗ',
      color: 'Синий',
      format: 'Букет',
      flower: 'Розы'
    },
    {
      id: 5,
      name: 'РОМАНТИКА',
      price: 3900,
      image: bouquet5Image,
      alt: 'Букет РОМАНТИКА',
      color: 'Розовый',
      format: 'Букет',
      flower: 'Розы'
    }
  ];

  // Меняем местами 2-й и 3-й только на мобильных
  const bouquetsToRender = isMobile
    ? [
        popularBouquets[0],
        popularBouquets[2], // третий становится вторым
        popularBouquets[1], // второй становится третьим
        ...popularBouquets.slice(3)
      ]
    : popularBouquets;

  // Обработчик кнопки "назад" в слайдере
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? 0 : prevIndex - 1));
  };

  // Обработчик кнопки "вперёд" в слайдере
  const handleNext = () => {
    const maxIndex = bouquetsToRender.length - itemsPerView;
    setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? maxIndex : prevIndex + 1));
  };

  // Добавить букет в корзину
  const handleAddToCart = (bouquet) => {
    addToCart(bouquet);
  };

  // Проверить, есть ли букет в корзине
  const isInCart = (bouquetId) => {
    return cartItems.some(item => item.id === bouquetId);
  };

  useEffect(() => {
    if (bouquetsGridRef.current && bouquetsToRender.length > 0) {
      const itemWidth = bouquetsGridRef.current.children[0].offsetWidth + 15; // 15px is the gap
      
      const carouselContainer = bouquetsGridRef.current.parentElement; // Получаем родительский элемент (.bouquets-carousel)
      const carouselComputedStyle = window.getComputedStyle(carouselContainer);
      const carouselPaddingLeft = parseInt(carouselComputedStyle.paddingLeft); // Отступ слева у .bouquets-carousel
      const carouselPaddingRight = parseInt(carouselComputedStyle.paddingRight); // Отступ справа у .bouquets-carousel
      
      // Фактическая видимая ширина для букетов
      const effectiveCarouselWidth = carouselContainer.clientWidth - carouselPaddingLeft - carouselPaddingRight;
      
      const totalContentWidth = bouquetsGridRef.current.scrollWidth; // Общая ширина всех букетов внутри сетки

      // Максимальное расстояние, на которое можно прокрутить, чтобы последний букет был виден
      const maxScrollDistance = Math.max(0, totalContentWidth - effectiveCarouselWidth);

      // Вычисляем желаемое смещение
      const desiredTransformX = -currentIndex * itemWidth;

      // Ограничиваем смещение, чтобы не листать в пустоту
      const newTransformX = Math.max(desiredTransformX, -maxScrollDistance);
      
      bouquetsGridRef.current.style.transform = `translateX(${newTransformX}px)`;

      console.log('--- Carousel Debug Info ---');
      console.log('itemWidth:', itemWidth);
      console.log('carouselContainer.clientWidth:', carouselContainer.clientWidth);
      console.log('carouselPaddingLeft:', carouselPaddingLeft);
      console.log('carouselPaddingRight:', carouselPaddingRight);
      console.log('effectiveCarouselWidth:', effectiveCarouselWidth);
      console.log('totalContentWidth (scrollWidth):', totalContentWidth);
      console.log('maxScrollDistance:', maxScrollDistance);
      console.log('currentIndex:', currentIndex);
      console.log('desiredTransformX:', desiredTransformX);
      console.log('newTransformX (applied):', newTransformX);
      console.log('---------------------------');
    }
  }, [currentIndex, bouquetsToRender.length, itemsPerView]); 

  return (
    <section className="popular-section">
      <div className="ellipse ellipse-2"></div>
      
      <div className="popular-container">
        <h2>Популярные букеты</h2>
        <p className="popular-subtitle">Самые любимые композиции наших клиентов</p>
        
        <div className="bouquets-carousel">
          <button className="carousel-arrow prev" onClick={handlePrev} disabled={currentIndex === 0}>
            <svg className="arrow-icon" viewBox="0 0 24 24">
              <path d="M15 18l-6-6 6-6"></path>
            </svg>
          </button>
          
          <div className="bouquets-grid" ref={bouquetsGridRef}>
            {bouquetsToRender.map((bouquet, index) => (
              <div className="bouquet-item" key={index}>
                <div className="bouquet-image-wrapper">
                  <img src={bouquet.image} alt={bouquet.alt} className="bouquet-image" />
                </div>
                <h3>{bouquet.name}</h3>
                <p className="price">{bouquet.price.toLocaleString()} ₽</p>
                <button 
                  className={`add-to-cart-button ${isInCart(bouquet.id) ? 'in-cart' : ''}`}
                  onClick={() => handleAddToCart(bouquet)}
                >
                  {isInCart(bouquet.id) ? 'В КОРЗИНЕ' : 'Добавить в корзину'}
                </button>
            </div>
            ))}
          </div>
          
          <button className="carousel-arrow next" onClick={handleNext} disabled={currentIndex >= bouquetsToRender.length - itemsPerView}>
            <svg className="arrow-icon" viewBox="0 0 24 24">
              <path d="M9 18l6-6-6-6"></path>
            </svg>
          </button>
        </div>
        
        <Link to="/catalog" className="view-all">смотреть все</Link>
      </div>
    </section>
  );
};

export default PopularSection; 