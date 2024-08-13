// src/pages/HomePage.js
import React from 'react';
import '../styles/HomePage.css';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="homepage">
      <header className="hero-section">
        <div className="hero-content">
          <h1>Welcome to GiftDynamics</h1>
          <p>Your one-stop shop for customized gifts and more!</p>
          <Link to="/products">
            <button className="shop-now-button">Shop Now</button>
          </Link>
        </div>
      </header>
      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="product-grid">
          <div className="product-item">
            <img src="https://www.yourprint.in/wp-content/uploads/2017/05/white_mug.png" alt="Cup" />
            <h3>Custom Mug</h3>
            <p>Perfect for your morning coffee with a personal touch.</p>
          </div>
          <div className="product-item">
            <img src="https://m.media-amazon.com/images/I/61UUP+zZxoL._AC_UF1000,1000_QL80_.jpg" alt="Pen" />
            <h3>Engraved Pen</h3>
            <p>A sophisticated gift for professionals and writers.</p>
          </div>
          <div className="product-item">
            <img src="https://images.squarespace-cdn.com/content/v1/572a977a45bf21aba915b8ff/1576150432894-FMCRZQ2WT3G1X2NJLHRR/Custom+T-Shirt%2C+Custom+Shirts%2C+Design+Your+Own+Shirts+Online" alt="T-Shirt" />
            <h3>Personalized T-Shirt</h3>
            <p>Comfortable and stylish with your unique design.</p>
          </div>
        </div>
      </section>
      <section className="about-us">
        <h2>About Us</h2>
        
        <p>
          Our team is passionate about quality and craftsmanship. We work with skilled artisans and use high-quality materials to ensure that every product meets our high standards. Whether you're looking for a thoughtful gift for a loved one or a special treat for yourself, we're here to help you make every moment memorable.
        </p>
        <p>
          At GiftDynamics, we understand the importance of customer satisfaction. That's why we're dedicated to providing excellent service and ensuring that every customer is happy with their purchase. Our friendly and knowledgeable customer service team is always here to assist you with any questions or concerns.
        </p>
        <p>
          Thank you for choosing GiftDynamics for your gifting needs. We look forward to helping you create beautiful memories with our unique and personalized products.
        </p>
      </section>
      <footer className="footer">
        <p>&copy; 2024 GiftDynamics. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
