import React, { useEffect, useRef } from 'react';

const PopularSection = () => {
  const bouquetsGridRef = useRef(null);
  const currentIndex = 0; // Assuming a default currentIndex
  const bouquets = []; // Assuming a default bouquets array

  useEffect(() => {
    if (bouquetsGridRef.current && bouquets.length > 0) {
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
    }
  }, [currentIndex, bouquets.length]);

  return (
    // ... existing code ...
  );
};

export default PopularSection; 