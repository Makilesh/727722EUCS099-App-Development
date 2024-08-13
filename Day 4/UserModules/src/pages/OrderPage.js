import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ShippingDetails from './ShippingDetails';
import '../styles/OrderPage.css';

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [visibleShippingDetails, setVisibleShippingDetails] = useState({});

  useEffect(() => {
    fetchOrders();
    fetchProducts();
  }, []);

  const fetchOrders = () => {
    axios.get('http://localhost:5000/orders')
      .then(response => setOrders(response.data))
      .catch(error => console.error('Error fetching orders', error));
  };

  const fetchProducts = () => {
    axios.get('http://localhost:5000/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products', error));
  };

  const getProductDetails = (productId) => {
    return products.find(product => product.id === productId) || {};
  };

  const toggleShippingDetails = (orderId) => {
    setVisibleShippingDetails(prevState => ({
      ...prevState,
      [orderId]: !prevState[orderId],
    }));
  };

  return (
    <div className="order-page">
      <h1>Your Orders</h1>
      {orders.length === 0 ? (
        <p>No orders placed yet.</p>
      ) : (
        <div className="orders-container">
          {orders.map(order => (
            <div key={order.id} className="order-item">
              <div className="order-info">
                <div className="order-info-left">
                  <p><strong>Order ID:</strong> {order.id}</p>
                  <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
                </div>
                <div className="order-info-right">
                  <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>
                  <p><strong>Estimated Delivery Date:</strong> {new Date(order.estimatedDeliveryDate).toLocaleDateString()}</p>
                </div>
              </div>
              
              <button 
                className="shipping-details-button" 
                onClick={() => toggleShippingDetails(order.id)}
              >
                {visibleShippingDetails[order.id] ? 'Hide Shipping Details' : 'Show Shipping Details'}
              </button>
              
              {visibleShippingDetails[order.id] && (
                <ShippingDetails shippingStatus={order.shippingStatus} />
              )}

              <div className="order-items">
                {order.items.map(item => {
                  const product = getProductDetails(item.id);
                  return (
                    <div key={item.id} className="order-product">
                      <img src={product.imageUrl} alt={product.name} />
                      <div>
                        <h4>{product.name}</h4>
                        <p>Rating: {product.rating ? parseFloat(product.rating).toFixed(1) : 'N/A'}</p>
                        <p>Count: {product.count ? parseInt(product.count, 10) : 'N/A'}</p>
                        <p>Price: ${product.price ? parseFloat(product.price).toFixed(2) : 'N/A'}</p>
                        <p>Quantity: {item.quantity}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderPage;
