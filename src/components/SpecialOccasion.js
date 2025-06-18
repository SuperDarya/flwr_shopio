import React from 'react';
import specialImage1 from '../images/особ1.png';
import specialImage2 from '../images/особ2.png';
import specialImage3 from '../images/особ3.png';
import specialImage4 from '../images/особ4.png';
import numIcon from '../images/num.png';

// Секция "Букеты для особых случаев" (SpecialOccasion)
const SpecialOccasion = () => {
  return (
    <section className="special-occasion">
      <div className="ellipse ellipse-2"></div>
      
      <div className="special-occasion-container">
        <div className="special-header">
          <h2 className="special-title">Особенные события</h2>
          <img src={specialImage1} alt="Особые букеты" className="special-header-image" />
        </div>
        
        <div className="special-content">
          <div className="special-text-block">
            <p className="special-description">
              Мы создаем букеты и композиции для любых событий и праздников. 
              Наши флористы подберут идеальное сочетание цветов и оформление, которое подчеркнет значимость момента.
            </p>
            
            <ul className="special-list">
              <li>Букеты для свадеб</li>
              <li>Букеты для дней рождений</li>
              <li>Корпоративные композиции</li>
              <li>Романтические букеты</li>
              <li>Композиции для особых событий</li>
            </ul>
            
            <a href="tel:+79877383979" className="custom-bouquet-btn">Заказать индивидуальный букет</a>
          </div>
          
          <div className="special-images">
            <img src={specialImage2} alt="Букет для особых случаев" className="special-image" />
            <img src={specialImage3} alt="Букет для особых случаев" className="special-image" />
            <img src={specialImage4} alt="Букет для особых случаев" className="special-image" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialOccasion; 