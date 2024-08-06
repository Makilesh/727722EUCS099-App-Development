import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const [searchInput, setSearchInput] = useState('');

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const products = [
    { name: 'Mug', products: ['Personalized Mug', 'Custom Mug', 'Photo Mug'] },
    { name: 'T-Shirt', products: ['Custom T-Shirt', 'Design Your Own T-Shirt', 'Funny T-Shirt'] },
    { name: 'Jewelry', products: ['Engraved Jewelry', 'Custom Necklace', 'Personalized Ring'] },
  ];

  const filteredProducts = products.filter((product) => {
    return product.name.toLowerCase().includes(searchInput.toLowerCase());
  });

  return (
    <div className="homepage">
      <nav className="navbar">
        <div className="logo"><img src="https://www.logocowboy.com/wp-content/uploads/2016/08/giftway.png"/></div>
        <ul className="nav-links">
          <li><a href="/home">Home</a></li>
          <li><a href="#about">About Us</a></li>
          <li><a href="/products">Products</a></li>
          <li><a href="/orders">Your Orders</a></li>
          <li><a href="/cart">Cart</a></li>
          <li><a href="/login">Sign in</a></li>
        </ul>
      </nav>
      
      <header className="header">
        <h1 className="title">Welcome to Your Customized Gift Portal</h1>
        <p className="subtitle">Create unique gifts for your loved ones!</p>
        <input
          type="search"
          placeholder="Search for products"
          onChange={handleChange}
          value={searchInput}
        />
      </header>
      
      <div className="categories">
        {filteredProducts.map((product) => (
          <div className="category" key={product.name}>
            
            <h2>{product.name}</h2>
            <p>Customize your mug with names, photos, or quotes!</p>
            <img src="https://i.pinimg.com/originals/f6/6f/e9/f66fe91b0f8c982f9312d4af87832181.png"/>
            
          </div>
        ))}
      </div>
      <button className="shopping-button">
        <Link to="/products">Start Shopping</Link>
      </button>
      <footer className="footer">
        <div id="about" className="about">
          <h2>About Us</h2>
          <p>We are dedicated to providing the best services to our customers.</p>
        </div>
        <div id="contact" className="contact">
          <h2>Contact Us</h2>
          <p>Email: contact@mywebsite.com</p>
          <p>Phone: (123) 456-7890</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;