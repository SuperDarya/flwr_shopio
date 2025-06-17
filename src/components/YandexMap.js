import React, { useEffect, useRef } from 'react';

const YandexMap = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    // Initialize map when component mounts
    if (window.ymaps) {
      window.ymaps.ready(() => {
        const map = new window.ymaps.Map(mapRef.current, {
          center: [55.7887, 49.1221], // Coordinates for Kazan
          zoom: 15,
          controls: ['zoomControl', 'fullscreenControl']
        });

        // Add marker for our location
        const marker = new window.ymaps.Placemark([55.791941, 49.126231], {
          balloonContent: 'г. Казань, ул. Пушкина, д. 32'
        }, {
          preset: 'islands#redDotIcon'
        });
        map.geoObjects.add(marker);
        map.behaviors.disable('scrollZoom');
      });
    }
  }, []);

  return (
    <div 
      ref={mapRef} 
      style={{ 
        width: '100%', 
        height: '400px',
        borderRadius: '20px',
        overflow: 'hidden',
        marginTop: '30px'
      }}
    />
  );
};

export default YandexMap; 