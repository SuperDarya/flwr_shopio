import React, { useState } from 'react';

const QuestionsSection = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', question: '' });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Имя обязательно';
    if (!formData.phone) newErrors.phone = 'Номер телефона обязателен';
    else if (!/^\+7\d{10}$/.test(formData.phone)) newErrors.phone = 'Номер телефона должен быть в формате +7XXXXXXXXXX';
    if (!formData.question) newErrors.question = 'Вопрос обязателен';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setShowModal(true);
      setFormData({ name: '', phone: '', question: '' });
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <section className="questions-section">
      <div className="questions-container">
        <div className="questions-header">
          <div className="questions-title-wrapper">
            <div className="turquoise-line"></div>
            <h2 className="questions-title">Остались вопросы?</h2>
          </div>
          <p className="questions-subtitle">
            Оставьте свои данные и наш флорист свяжется с вами в ближайшее время и ответит на все ваши вопросы
          </p>
        </div>
        
        <div className="questions-content">
          <div className="contact-form-container">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input type="text" name="name" className="form-input" placeholder="Ваше имя" value={formData.name} onChange={handleChange} />
                {errors.name && <span className="error" style={{ color: 'turquoise' }}>{errors.name}</span>}
              </div>
              
              <div className="form-group">
                <input type="tel" name="phone" className="form-input" placeholder="Номер телефона" value={formData.phone} onChange={handleChange} />
                {errors.phone && <span className="error" style={{ color: 'turquoise' }}>{errors.phone}</span>}
              </div>
              
              <div className="form-group">
                <textarea name="question" className="form-input form-textarea" placeholder="Ваш вопрос" value={formData.question} onChange={handleChange}></textarea>
                {errors.question && <span className="error" style={{ color: 'turquoise' }}>{errors.question}</span>}
              </div>
              
              <button type="submit" className="submit-button">Отправить</button>
            </form>
          </div>
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

export default QuestionsSection; 