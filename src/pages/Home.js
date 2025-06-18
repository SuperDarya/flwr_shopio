// Главная страница сайта
import React from 'react';
// Импортируем секции главной страницы
import Hero from '../components/Hero'; // Главный баннер
import PopularSection from '../components/PopularSection'; // Популярные букеты
import OrderSection from '../components/OrderSection'; // Как сделать заказ
import SpecialOccasion from '../components/SpecialOccasion'; // Особые случаи
import QuestionsSection from '../components/QuestionsSection'; // Часто задаваемые вопросы

const Home = () => {
  return (
    <main>
      {/* Главный баннер */}
      <Hero />
      {/* Секция популярных букетов */}
      <PopularSection />
      {/* Секция "Как сделать заказ" */}
      <OrderSection />
      {/* Секция для особых случаев */}
      <SpecialOccasion />
      {/* Секция с вопросами */}
      <QuestionsSection />
    </main>
  );
};

export default Home; 