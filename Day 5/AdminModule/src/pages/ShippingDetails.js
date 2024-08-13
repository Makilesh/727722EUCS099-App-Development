// src/components/ShippingDetails.js
import React from 'react';
import '../styles/ShippingDetails.css';

const ShippingDetails = ({ shippingStatus }) => {
  return (
    <div className="shipping-details">
      <div className="shipping-bar">
        <div className= "shipping-point" >Order Placed</div>
        <div className={`shipping-point ${shippingStatus >= 2 ? 'active' : ''}`}>Dispatched</div>
        <div className={`shipping-point ${shippingStatus >= 3 ? 'active' : ''}`}>In Transit</div>
        <div className={`shipping-point ${shippingStatus >= 4 ? 'active' : ''}`}>Out for Delivery</div>
        <div className={`shipping-point ${shippingStatus >= 5 ? 'active' : ''}`}>Delivered</div>
      </div>
    </div>
  );
};

export default ShippingDetails;
