import React from 'react';
import './Delivery.css';

const Delivery = () => {
  return (
    <section className="delivery-page">
      <div className="delivery-header">
        <h1>Доставка и оплата</h1>
        <p>Удобные способы доставки и оплаты для наших клиентов</p>
      </div>

      <div className="delivery-content">
        <div className="delivery-section">
          <h2>Способы доставки</h2>
          <div className="delivery-methods">
            <div className="delivery-method">
              <h3>Курьерская доставка</h3>
              <p>Доставка курьером по Казани в течение 2-3 часов</p>
              <ul>
                <li>Бесплатная доставка при заказе от 3500 руб.</li>
                <li>Стоимость доставки от 300 руб.</li>
                <li>Доставка в выходные и праздничные дни</li>
              </ul>
            </div>

            <div className="delivery-method">
              <h3>Самовывоз</h3>
              <p>Заберите заказ из нашего магазина</p>
              <ul>
                <li>Адрес: ул. Пушкина, 32</li>
                <li>Время работы: 10:00 - 21:00</li>
                <li>Бесплатно</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="payment-section">
          <h2>Способы оплаты</h2>
          <div className="payment-methods">
            <div className="payment-method">
              <h3>Онлайн оплата</h3>
              <p>Не доступна в настоящее время, в связи с техническими неполадками</p>
              <ul>
                <li>Visa/Mastercard</li>
                <li>Банковский перевод</li>
                <li>Моментальное подтверждение</li>
              </ul>
            </div>

            <div className="payment-method">
              <h3>Оплата при получении</h3>
              <p>Оплата наличными или картой при получении</p>
              <ul>
                <li>Наличными курьеру</li>
                <li>Картой курьеру</li>
                <li>В магазине при самовывозе</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Delivery; 