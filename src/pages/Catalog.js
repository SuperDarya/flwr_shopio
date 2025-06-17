import React, { useState, useMemo } from 'react';
import './Catalog.css';
import 'rc-slider/assets/index.css'; // Import rc-slider CSS
import Slider from 'rc-slider'; // Import Slider component
import catalogBackground from '../images/catalogbackground.png';
// import instIcon from '../images/inst.png'; // Assuming you want Instagram back here
// import waIcon from '../images/wa.png'; // Assuming you want WhatsApp back here
import numIcon from '../images/num.png'; // Adding numIcon for the phone icon
import bouquet1 from '../images/bouquet1.jpg';
import bouquet2 from '../images/bouquet2.png';
import bouquet3 from '../images/bouquet3.png';
import bouquet4 from '../images/bouquet4.png';
import bouquet5 from '../images/bouquet5.png';
import bouquet6 from '../images/bouquet6.jpg';
import bouquet7 from '../images/bouquet7.jpg';
import bouquet8 from '../images/bouquet8.png';
import { useCart } from '../context/CartContext';

const bouquetsData = [
  { id: 1, name: 'НЕЖНОСТЬ', price: 9999, image: bouquet1, tags: ['NEW'], color: ['Белый', 'Розовый'], format: 'Букет', flower: ['Розы'] },
  { id: 2, name: 'АПЕЛЬСИНОВЫЙ РАЙ', price: 4200, image: bouquet2, tags: [], color: ['Желтый', 'Красный'], format: 'Шляпная коробка', flower: ['Розы', 'Пионы'] },
  { id: 3, name: 'ВЕСЕННЕЕ НАСТРОЕНИЕ', price: 3800, image: bouquet3, tags: [], color: ['Белый', 'Розовый', 'Фиолетовый'], format: 'Букет', flower: ['Розы', 'Эустомы', 'Гвоздики'] },
  { id: 4, name: 'ЛЕТНИЙ БРИЗ', price: 4500, image: bouquet4, tags: ['SALE'], color: ['Синий', 'Розовый'], format: 'Букет', flower: ['Розы', 'Гортензии'] },
  { id: 5, name: 'РОМАНТИКА', price: 3900, image: bouquet5, tags: ['SALE'], color: ['Белый'], format: 'Букет', flower: ['Розы'] },
  { id: 6, name: 'МЕЧТА НАЯВУ', price: 5199, image: bouquet6, tags: [], color: ['Розовый'], format: 'Букет', flower: ['Пионы'] },
  { id: 7, name: 'ЭЛЕГАНТНОСТЬ', price: 4200, image: bouquet7, tags: ['NEW'], color: ['Белый', 'Розовый'], format: 'Букет', flower: ['Розы'] },
  { id: 8, name: 'ЯРКОСТЬ', price: 3500, image: bouquet8, tags: [], color: ['Розовый', 'Красный'], format: 'Букет', flower: ['Розы'] }
];

const Catalog = () => {
  const { cartItems, addToCart } = useCart();
  const [filters, setFilters] = useState({
    color: [],
    flower: [],
    format: [],
    priceMin: 0, // Initialize with numbers for slider
    priceMax: 15000, // Set a default max price based on your data
  });
  const [sortOrder, setSortOrder] = useState('default'); // New state for sorting
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: checked
        ? [...prevFilters[name], value]
        : prevFilters[name].filter((item) => item !== value),
    }));
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value === '' ? '' : parseFloat(value),
    }));
  };

  const handleSliderChange = (value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      priceMin: value[0],
      priceMax: value[1],
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      color: [],
      flower: [],
      format: [],
      priceMin: 0,
      priceMax: 15000,
    });
  };

  const handleApplyFilters = () => {
    // Logic to apply filters (e.g., fetch data or filter current data)
    console.log('Applying filters:', filters);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleAddToCart = (bouquet) => {
    addToCart(bouquet);
  };

  const isInCart = (bouquetId) => {
    return cartItems.some(item => item.id === bouquetId);
  };

  const filteredBouquets = useMemo(() => {
    let currentBouquets = bouquetsData;

    // Filtering logic
    currentBouquets = currentBouquets.filter((bouquet) => {
      const { color: selectedColors, flower: selectedFlowers, format, priceMin, priceMax } = filters;

      const matchesColor = selectedColors.length === 0 || selectedColors.some(filterColor => bouquet.color.includes(filterColor));
      const matchesFlower = selectedFlowers.length === 0 || selectedFlowers.some(filterFlower => bouquet.flower.includes(filterFlower));
      const matchesFormat = format.length === 0 || format.includes(bouquet.format);
      const matchesPrice =
        (priceMin === 0 || bouquet.price >= priceMin) &&
        (priceMax === 15000 || bouquet.price <= priceMax);

      return matchesColor && matchesFlower && matchesFormat && matchesPrice;
    });

    // Sorting logic
    if (sortOrder === 'price-asc') {
      currentBouquets = [...currentBouquets].sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'price-desc') {
      currentBouquets = [...currentBouquets].sort((a, b) => b.price - a.price);
    }

    return currentBouquets;
  }, [filters, sortOrder]);

  return (
    <section className="catalog-page">
      <div className="catalog-header">
        <div className="catalog-header-content">
          <h1 className="catalog-title">КАТАЛОГ БУКЕТОВ</h1>
          <p className="catalog-description">
            В нашем магазине самый большой выбор букетов для любых событий
          </p>
          <div className="header-contact-info">
            {/* <p>loverflower@mail.ru</p> */}
            {/* <p>г. Казань, ул. Пушкина, д. 32</p> */}
            {/* <p>10-00 ДО 21-00<br/>БЕЗ ВЫХОДНЫХ</p> */}
            <p className="phone">+7 (987) 738-39-79</p>
            <a href="tel:+79877383979" className="callback-link"><img src={numIcon} alt="Phone" className="callback-icon" /> Заказать звонок</a>
            {/* <div className="header-social-icons">
              <a href="#"><img src={instIcon} alt="Instagram" /></a>
              <a href="#"><img src={waIcon} alt="WhatsApp" /></a>
            </div> */}
          </div>
        </div>
      </div>

      <div className="catalog-main-wrapper">
        <div className="catalog-sidebar">
          <div className="filter-group">
            <h3 className="filter-group-title">ПО ЦВЕТУ</h3>
            <label className="checkbox-container">
              <input type="checkbox" name="color" value="Красный" onChange={handleCheckboxChange} checked={filters.color.includes('Красный')}/>Красный
              <span className="checkmark"></span>
            </label>
            <label className="checkbox-container">
              <input type="checkbox" name="color" value="Белый" onChange={handleCheckboxChange} checked={filters.color.includes('Белый')}/>Белый
              <span className="checkmark"></span>
            </label>
            <label className="checkbox-container">
              <input type="checkbox" name="color" value="Розовый" onChange={handleCheckboxChange} checked={filters.color.includes('Розовый')}/>Розовый
              <span className="checkmark"></span>
            </label>
            <label className="checkbox-container">
              <input type="checkbox" name="color" value="Желтый" onChange={handleCheckboxChange} checked={filters.color.includes('Желтый')}/>Желтый
              <span className="checkmark"></span>
            </label>
            <label className="checkbox-container">
              <input type="checkbox" name="color" value="Синий" onChange={handleCheckboxChange} checked={filters.color.includes('Синий')}/>Синий
              <span className="checkmark"></span>
            </label>
            <label className="checkbox-container">
              <input type="checkbox" name="color" value="Фиолетовый" onChange={handleCheckboxChange} checked={filters.color.includes('Фиолетовый')}/>Фиолетовый
              <span className="checkmark"></span>
            </label>
          </div>

          <div className="filter-group">
            <h3 className="filter-group-title">ПО ФОРМАТУ</h3>
            <label className="checkbox-container">
              <input type="checkbox" name="format" value="Букет" onChange={handleCheckboxChange} checked={filters.format.includes('Букет')}/>Букет
              <span className="checkmark"></span>
            </label>
            <label className="checkbox-container">
              <input type="checkbox" name="format" value="Шляпная коробка" onChange={handleCheckboxChange} checked={filters.format.includes('Шляпная коробка')}/>Шляпная коробка
              <span className="checkmark"></span>
            </label>
            <label className="checkbox-container">
              <input type="checkbox" name="format" value="Корзина" onChange={handleCheckboxChange} checked={filters.format.includes('Корзина')}/>Корзина
              <span className="checkmark"></span>
            </label>
            
            <label className="checkbox-container">
              <input type="checkbox" name="format" value="Монобукет" onChange={handleCheckboxChange} checked={filters.format.includes('Монобукет')}/>Монобукет
              <span className="checkmark"></span>
            </label>
          </div>

          <div className="filter-group">
            <h3 className="filter-group-title">СТОИМОСТЬ</h3>
            <div className="price-range">
              <Slider
                range
                min={0}
                max={15000} // Set a reasonable max value for your bouquets
                defaultValue={[filters.priceMin, filters.priceMax]}
                value={[filters.priceMin, filters.priceMax]}
                onChange={handleSliderChange}
                trackStyle={{ backgroundColor: '#43ffd2' }}
                handleStyle={[
                  { backgroundColor: '#43ffd2', borderColor: '#43ffd2', opacity: 1, boxShadow: 'none' },
                  { backgroundColor: '#43ffd2', borderColor: '#43ffd2', opacity: 1, boxShadow: 'none' }
                ]}
                railStyle={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
              />
              <div className="price-display mt-4 flex justify-between text-white text-sm" style={{ color: '#43ffd2' }}>
                <span>От {filters.priceMin.toLocaleString()} ₽ </span>
                <span>До {filters.priceMax.toLocaleString()} ₽</span>
              </div>
            </div>
            {/* The old placeholder div is now effectively replaced */}
          </div>

          <div className="filter-group">
            <h3 className="filter-group-title"></h3>
            <label className="checkbox-container">
              <input type="checkbox" name="flower" value="Розы" onChange={handleCheckboxChange} checked={filters.flower.includes('Розы')}/>Розы 
              <span className="checkmark"></span>
            </label>
            <label className="checkbox-container">
              <input type="checkbox" name="flower" value="Тюльпаны" onChange={handleCheckboxChange} checked={filters.flower.includes('Тюльпаны')}/>Тюльпаны 
              <span className="checkmark"></span>
            </label>
            <label className="checkbox-container">
              <input type="checkbox" name="flower" value="Пионы" onChange={handleCheckboxChange} checked={filters.flower.includes('Пионы')}/>Пионы 
              <span className="checkmark"></span>
            </label>
            <label className="checkbox-container">
              <input type="checkbox" name="flower" value="Эустомы" onChange={handleCheckboxChange} checked={filters.flower.includes('Эустомы')}/>Эустомы 
              <span className="checkmark"></span>
            </label>
            <label className="checkbox-container">
              <input type="checkbox" name="flower" value="Гвоздики" onChange={handleCheckboxChange} checked={filters.flower.includes('Гвоздики')}/>Гвоздики 
              <span className="checkmark"></span>
            </label>
            <label className="checkbox-container">
              <input type="checkbox" name="flower" value="Лилии" onChange={handleCheckboxChange} checked={filters.flower.includes('Лилии')}/>Лилии 
              <span className="checkmark"></span>
            </label>
          </div>
          
          <div className="filter-actions">
            <button className="reset-button" onClick={handleResetFilters}>СБРОСИТЬ ФИЛЬТР</button>
            
          </div>
        </div>

        <div className="catalog-main-content">
          <div className="sort-options">
            <label htmlFor="sort-by">СОРТИРОВАТЬ</label>
            <select
              id="sort-by"
              value={sortOrder}
              onChange={handleSortChange}
              className="sort-select"
            >
              <option value="default">По умолчанию</option>
              <option value="price-asc">По возрастанию цены</option>
              <option value="price-desc">По убыванию цены</option>
            </select>
          </div>

          <div className="catalog-grid">
            {filteredBouquets.length > 0 ? (
              filteredBouquets.map((bouquet) => (
                <div key={bouquet.id} className="bouquet-card">
                  <div className="bouquet-image-wrapper">
                    <img src={bouquet.image} alt={bouquet.name} className="bouquet-image" />
                    {bouquet.tags.includes('NEW') && <span className="tag new-tag">NEW</span>}
                    {bouquet.tags.includes('SALE') && <span className="tag sale-tag">SALE</span>}
                  </div>
                  <h3 className="bouquet-name">{bouquet.name}</h3>
                  <p className="bouquet-price">{bouquet.price.toLocaleString()} ₽</p>
                  <button 
                    className={`add-to-cart-button ${isInCart(bouquet.id) ? 'in-cart' : ''}`}
                    onClick={() => handleAddToCart(bouquet)}
                  >
                    {isInCart(bouquet.id) ? 'В КОРЗИНЕ' : 'В КОРЗИНУ'}
                  </button>
                </div>
              ))
            ) : (
              <p className="no-bouquets-message">Нет букетов, соответствующих выбранным критериям.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Catalog; 