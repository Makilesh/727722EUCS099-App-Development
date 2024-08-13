import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/OrderConfirmation.css';

const OrderConfirmation = () => {
  const location = useLocation();
  const { selectedAddress, paymentMethod, orderDate, estimatedDeliveryDate } = location.state || {};

  if (!selectedAddress || !paymentMethod || !orderDate || !estimatedDeliveryDate) {
    return <p>Order details are missing.</p>;
  }

  return (
    <div className="order-confirmation-page">
      <h1>Order Confirmation</h1>
      <p>Thank you for your order!</p>
      <p><strong>Delivery Address:</strong> {selectedAddress.StreetName}, {selectedAddress.city}, {selectedAddress.district}, {selectedAddress.state} {selectedAddress.pin}</p>
      <p><strong>Payment Method:</strong> {paymentMethod}</p>
      <p><strong>Order Date:</strong> {new Date(orderDate).toLocaleString()}</p>
      <p><strong>Estimated Delivery Date:</strong> {new Date(estimatedDeliveryDate).toLocaleDateString()}</p>
    </div>
  );
};

export default OrderConfirmation;
