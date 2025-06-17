import React from 'react';
import Hero from '../components/Hero';
import PopularSection from '../components/PopularSection';
import OrderSection from '../components/OrderSection';
import SpecialOccasion from '../components/SpecialOccasion';
import QuestionsSection from '../components/QuestionsSection';

const Home = () => {
  return (
    <main>
      <Hero />
      <PopularSection />
      <OrderSection />
      <SpecialOccasion />
      <QuestionsSection />
    </main>
  );
};

export default Home; 