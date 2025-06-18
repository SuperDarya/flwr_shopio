// Страница "Контакты"
import React, { useState } from 'react';
import './Contacts.css'; // Стили для страницы контактов
import YandexMap from '../components/YandexMap';

const Contacts = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/[^\d+]/g, '');
    if (!value.startsWith('+7')) {
      value = '+7' + value.replace(/^\+7/, '');
    }
    if (value.length > 12) {
      value = value.slice(0, 12);
    }
    setFormData(prev => ({
      ...prev,
      phone: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
    setFormData({
      name: '',
      phone: '',
      email: '',
      message: ''
    });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <section className="contacts-page">
      {/* Заголовок страницы */}
      <div className="contacts-header">
        <h1>Контакты</h1>
        <p>Свяжитесь с нами любым удобным способом</p>
      </div>

      <div className="contacts-content">
        {/* Основная контактная информация */}
        <div className="contacts-info">
          <div className="contact-card">
            <h3>Адрес</h3>
            <p>г. Казань, ул. Пушкина, д. 32</p>
          </div>
          <div className="contact-card">
            <h3>Телефон</h3>
            <p>+7 (987) 738-39-79</p>
          </div>
          <div className="contact-card">
            <h3>Email</h3>
            <p>loverflower@mail.ru</p>
          </div>
        </div>

        <YandexMap />

        <div className="contact-form">
          <h2>Напишите нам</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ваше имя"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handlePhoneChange}
                placeholder="+7XXXXXXXXXX"
                pattern="\+7\d{10}"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@mail.com"
                required
              />
            </div>
            <div className="form-group">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Ваше сообщение"
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-button">Отправить</button>
          </form>
        </div>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <p>Благодарим вас за обращение! Пожалуйста, ожидайте, наш администратор перезвонит вам в ближайшее время</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Contacts; 