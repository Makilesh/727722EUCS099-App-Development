import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/PaymentMethod.css';

const PaymentMethod = () => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedAddress } = location.state || {}; // Handle undefined state

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = () => {
    axios.get('http://localhost:5000/cart')
      .then(response => {
        setCartItems(response.data);
        fetchProductDetails(response.data);
      })
      .catch(error => console.error('Error fetching cart items', error));
  };

  const fetchProductDetails = (cartItems) => {
    axios.get('http://localhost:5000/products') // Adjust this URL to match your API endpoint
      .then(response => {
        const products = response.data;
        const details = cartItems.map(cartItem => {
          const product = products.find(p => p.id === cartItem.productId);
          return {
            ...cartItem,
            ...product,
            quantity: cartItem.quantity,
          };
        });
        setProductDetails(details);
      })
      .catch(error => console.error('Error fetching product details', error));
  };

  const placeOrder = () => {
    if (!paymentMethod) {
      alert('Please select a payment method.');
      return;
    }

    const orderDate = new Date();
    const estimatedDeliveryDate = new Date();
    estimatedDeliveryDate.setDate(orderDate.getDate() + 7);

    const orderDetails = {
      address: selectedAddress,
      paymentMethod,
      items: productDetails,
      orderDate: orderDate.toISOString(),
      estimatedDeliveryDate: estimatedDeliveryDate.toISOString(),
    };

    axios.post('http://localhost:5000/orders', orderDetails)
      .then(() => {
        clearCart();
        navigate('/order-confirmation', { state: { selectedAddress, paymentMethod, orderDate: orderDate.toISOString(), estimatedDeliveryDate: estimatedDeliveryDate.toISOString() } });
      })
      .catch(error => console.error('Error placing order', error));
  };

  const clearCart = () => {
    cartItems.forEach(item => {
      axios.delete(`http://localhost:5000/cart/${item.id}`)
        .catch(error => console.error('Error clearing cart item', error));
    });
  };

  return (
    <div className="payment-method-page">
      <h1>Select Payment Method</h1>
      <div>
        <input
          type="radio"
          id="creditCard"
          name="paymentMethod"
          value="Credit Card"
          onChange={(e) => setPaymentMethod(e.target.value)}
        />
        <label htmlFor="creditCard">Credit Card</label>
      </div>
      <div>
        <input
          type="radio"
          id="paypal"
          name="paymentMethod"
          value="PayPal"
          onChange={(e) => setPaymentMethod(e.target.value)}
        />
        <label htmlFor="paypal">PayPal</label>
      </div>
      <div>
        <input
          type="radio"
          id="Net Banking"
          name="paymentMethod"
          value="Net Banking"
          onChange={(e) => setPaymentMethod(e.target.value)}
        />
        <label htmlFor="Net Banking">Net Banking</label>
      </div>
      <div>
        <input
          type="radio"
          id="UPI"
          name="paymentMethod"
          value="UPI"
          onChange={(e) => setPaymentMethod(e.target.value)}
        />
        <label htmlFor="UPI">UPI</label>
      </div>
      <div>
        <input
          type="radio"
          id="cashOnDelivery"
          name="paymentMethod"
          value="Cash on Delivery"
          onChange={(e) => setPaymentMethod(e.target.value)}
        />
        <label htmlFor="cashOnDelivery">Cash on Delivery</label>
      </div>
      <button onClick={placeOrder}>Place Order</button>
    </div>
  );
};

export default PaymentMethod;
