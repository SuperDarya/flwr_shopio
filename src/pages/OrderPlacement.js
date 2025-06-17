import React, { useState } from 'react';
import './OrderPlacement.css';
import orderBackground from '../images/oformlenie.png';
import { useCart } from '../context/CartContext';

const OrderPlacement = () => {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    recipientName: '',
    recipientPhone: '',
    deliveryType: 'pickup', // pickup or delivery
    deliveryAddress: '',
    deliveryDate: '',
    deliveryTimeFrom: '',
    deliveryTimeTo: '',
    deliveryComment: '',
    paymentMethod: 'cash', // cash or card
    agreement: false,
  });

  const handlePhoneChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value.replace(/\D/g, '');
    if (formattedValue.length > 0) {
      if (!formattedValue.startsWith('7')) {
        formattedValue = '7' + formattedValue;
      }
      if (formattedValue.length > 1) {
        formattedValue = '+' + formattedValue;
      }
    }
    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'customerPhone' || name === 'recipientPhone') {
      handlePhoneChange(e);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.agreement) {
      alert('Пожалуйста, примите условия публичной оферты');
      return;
    }
    console.log('Order Data:', formData);
    setShowModal(true);
    clearCart();
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const formatPrice = (price) => {
    return typeof price === 'number' 
      ? price.toLocaleString() 
      : parseFloat(price.toString().replace(/[^\d.]/g, '')).toLocaleString();
  };

  return (
    <section className="order-placement-page">
      <div className="order-header">
        <h1 className="order-title">ОФОРМЛЕНИЕ ЗАКАЗА</h1>
        <p className="order-subtitle">Ваш заказ</p>
      </div>

      <div className="order-content">
        <div className="order-form-container">
          <h2>ОФОРМЛЕНИЕ ЗАКАЗА</h2>
          <form onSubmit={handleSubmit} className="order-form">
            <div className="form-section">
              <h3>КОНТАКТНЫЕ ДАННЫЕ</h3>
              <input
                type="text"
                name="customerName"
                placeholder="Имя*"
                value={formData.customerName}
                onChange={handleChange}
                required
                className="form-input"
              />
              <input
                type="tel"
                name="customerPhone"
                placeholder="+7XXXXXXXXXX*"
                value={formData.customerPhone}
                onChange={handleChange}
                required
                pattern="\+7[0-9]{10}"
                className="form-input"
              />
              <input
                type="email"
                name="customerEmail"
                placeholder="E-mail*"
                value={formData.customerEmail}
                onChange={handleChange}
                required
                className="form-input"
              />
              <input
                type="text"
                name="deliveryComment"
                placeholder="Комментарий"
                value={formData.deliveryComment}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-section">
              <h3>ДАННЫЕ ПОЛУЧАТЕЛЯ</h3>
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  name="recipientSameAsCustomer"
                  checked={formData.recipientSameAsCustomer}
                  onChange={(e) => setFormData(prev => ({...prev, recipientSameAsCustomer: e.target.checked}))}
                />Я получатель
                <span className="checkmark"></span>
              </label>
              {!formData.recipientSameAsCustomer && (
                <>
                  <input
                    type="text"
                    name="recipientName"
                    placeholder="Имя*"
                    value={formData.recipientName}
                    onChange={handleChange}
                    required={!formData.recipientSameAsCustomer}
                    className="form-input"
                  />
                  <input
                    type="tel"
                    name="recipientPhone"
                    placeholder="+7XXXXXXXXXX*"
                    value={formData.recipientPhone}
                    onChange={handleChange}
                    required={!formData.recipientSameAsCustomer}
                    pattern="\+7[0-9]{10}"
                    className="form-input"
                  />
                </>
              )}
            </div>

            <div className="form-section">
              <h3>ДОСТАВКА</h3>
              <div className="radio-group">
                <label className="radio-container">
                  <input
                    type="radio"
                    name="deliveryType"
                    value="pickup"
                    checked={formData.deliveryType === 'pickup'}
                    onChange={handleChange}
                  />Самовывоз
                  <span className="radio-checkmark"></span>
                </label>
                <label className="radio-container">
                  <input
                    type="radio"
                    name="deliveryType"
                    value="delivery"
                    checked={formData.deliveryType === 'delivery'}
                    onChange={handleChange}
                  />Доставка
                  <span className="radio-checkmark"></span>
                </label>
              </div>
              {formData.deliveryType === 'delivery' && (
                <>
                  <input
                    type="text"
                    name="deliveryAddress"
                    placeholder="Адрес доставки*"
                    value={formData.deliveryAddress}
                    onChange={handleChange}
                    required={formData.deliveryType === 'delivery'}
                    className="form-input"
                  />
                  <div className="date-time-group">
                    <input
                      type="date"
                      name="deliveryDate"
                      value={formData.deliveryDate}
                      onChange={handleChange}
                      required={formData.deliveryType === 'delivery'}
                      className="form-input"
                    />
                    <input
                      type="time"
                      name="deliveryTimeFrom"
                      placeholder="С"
                      value={formData.deliveryTimeFrom}
                      onChange={handleChange}
                      required={formData.deliveryType === 'delivery'}
                      className="form-input"
                    />
                    <input
                      type="time"
                      name="deliveryTimeTo"
                      placeholder="До"
                      value={formData.deliveryTimeTo}
                      onChange={handleChange}
                      required={formData.deliveryType === 'delivery'}
                      className="form-input"
                    />
                  </div>
                </>
              )}
            </div>

            <div className="form-section">
              <h3>ОПЛАТА</h3>
              <div className="radio-group">
                <label className="radio-container">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={formData.paymentMethod === 'cash'}
                    onChange={handleChange}
                  />Наличными
                  <span className="radio-checkmark"></span>
                </label>
                <label className="radio-container">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={handleChange}
                  />Картой
                  <span className="radio-checkmark"></span>
                </label>
              </div>
            </div>

            <div className="agreement-section">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  name="agreement"
                  checked={formData.agreement}
                  onChange={handleChange}
                  required
                />
                Я принимаю условия публичной оферты
                <span className="checkmark"></span>
              </label>
            </div>

            <button 
              type="submit" 
              className="checkout-order-button"
              disabled={!formData.agreement}
            >
              ОФОРМИТЬ ЗАКАЗ
            </button>
          </form>
        </div>

        <div className="order-summary-container">
          <h2>ВАШ ЗАКАЗ</h2>
          <div className="order-summary-items">
            {cartItems.map((item) => (
              <div key={item.id} className="summary-item">
                <div className="summary-item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="summary-item-details">
                  <p>{item.name}</p>
                  <span>{item.quantity} шт. × {formatPrice(item.price)} ₽</span>
                </div>
              </div>
            ))}
          </div>
          <div className="order-total-summary">
            <p>ИТОГО: <span>{formatPrice(getTotalPrice())} ₽</span></p>
          </div>
          <p className="delivery-note">
            {formData.deliveryType === 'delivery' 
              ? 'Стоимость доставки будет рассчитана менеджером'
              : 'Самовывоз бесплатно'}
          </p>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Ваш заказ принят!</h2>
            <p>Пожалуйста, ожидайте звонок от администратора для уточнения деталей заказа и его подтверждения.</p>
            <button onClick={closeModal} className="modal-close-button">
              Закрыть
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default OrderPlacement; 