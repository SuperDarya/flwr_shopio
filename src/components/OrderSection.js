import React, { useState, useEffect } from 'react';

const steps = [
  {
    num: '01',
    title: 'Выберите букет',
    desc: 'Выберите понравившийся букет из нашего каталога и оформите заказ',
  },
  {
    num: '02',
    title: 'Уточнение деталей',
    desc: 'Наш флорист позвонит вам для уточнения деталей заказа и доставки',
  },
  {
    num: '03',
    title: 'Оплата',
    desc: 'Выберите удобный способ оплаты: наличными курьеру или онлайн',
  },
  {
    num: '04',
    title: 'Доставка',
    desc: 'Курьер доставит ваш заказ точно в указанное время и место',
  },
];

const OrderSection = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 960);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 960);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="order-section">
      <div className="order-container-wrapper">
        <h2 className="order-title">Как сделать заказ</h2>
        <div className="order-container">
          <div className="order-steps-column">
            <div className="steps-container">
              <div className="vertical-line"></div>
              {isMobile ? (
                <div className="steps-column">
                  {steps.map((step, idx) => (
                    <div className="step-item" key={idx}>
                      <div className="step-number">{step.num}</div>
                      <div className="step-content">
                        <h3>{step.title}</h3>
                        <p>{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <>
              <div className="steps-column">
                <div className="step-item">
                  <div className="step-number">01</div>
                  <div className="step-content">
                    <h3>Выберите букет</h3>
                    <p>Выберите понравившийся букет из нашего каталога и оформите заказ</p>
                  </div>
                </div>
                <div className="step-item">
                  <div className="step-number">03</div>
                  <div className="step-content">
                    <h3>Оплата</h3>
                    <p>Выберите удобный способ оплаты: наличными курьеру или онлайн</p>
                  </div>
                </div>
              </div>
              <div className="steps-column">
                <div className="step-item">
                  <div className="step-number">02</div>
                  <div className="step-content">
                    <h3>Уточнение деталей</h3>
                    <p>Наш флорист позвонит вам для уточнения деталей заказа и доставки</p>
                  </div>
                </div>
                <div className="step-item">
                  <div className="step-number">04</div>
                  <div className="step-content">
                    <h3>Доставка</h3>
                    <p>Курьер доставит ваш заказ точно в указанное время и место</p>
                  </div>
                </div>
              </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderSection; 