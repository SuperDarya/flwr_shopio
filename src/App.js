// Главный компонент приложения
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Для роутинга между страницами
import './index.css'; // Глобальные стили

import Header from './components/Header'; // Верхнее меню
import Footer from './components/Footer'; // Нижний колонтитул
import Home from './pages/Home'; // Главная страница
import Catalog from './pages/Catalog'; // Каталог букетов
import Delivery from './pages/Delivery'; // Доставка и оплата
import About from './pages/About'; // О компании
import Contacts from './pages/Contacts'; // Контакты
import FAQ from './pages/FAQ'; // Часто задаваемые вопросы
import Cart from './pages/Cart'; // Корзина
import OrderPlacement from './pages/OrderPlacement'; // Оформление заказа
import { CartProvider } from './context/CartContext'; // Провайдер состояния корзины

function App() {
  return (
    // Провайдер корзины, чтобы все компоненты имели доступ к корзине
    <CartProvider>
      {/* Router для навигации по страницам */}
      <Router>
        <div className="main-container flex flex-col min-h-screen">
          {/* Верхнее меню */}
          <Header />
          {/* Основной контент, который меняется в зависимости от маршрута */}
          <div className="flex-grow">
            <Routes>
              {/* Определение маршрутов для каждой страницы */}
              <Route path="/" element={<Home />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/delivery" element={<Delivery />} />
              <Route path="/about" element={<About />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/order-placement" element={<OrderPlacement />} />
            </Routes>
          </div>
          {/* Нижний колонтитул */}
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App; // Экспорт главного компонента 