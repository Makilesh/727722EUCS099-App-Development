import React from 'react';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage">
      <nav className="navbar">
        <div className="logo"><img src="https://www.logocowboy.com/wp-content/uploads/2016/08/giftway.png"/></div>
        <ul className="nav-links">
          <li><a href="/home">Home</a></li>
          <li><a href="#about">About Us</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="/login">Sign in</a></li>
        </ul>
      </nav>
      
      <header className="header">
        <h1 className="title">Welcome to Your Customized Gift Portal</h1>
        <p className="subtitle">Create unique gifts for your loved ones!</p>
      </header>
      
      <div className="categories">
        <div className="category">
          <h2>Personalized Mugs</h2>
          <p>Customize your mug with names, photos, or quotes!</p>
          <img src="https://i.pinimg.com/originals/f6/6f/e9/f66fe91b0f8c982f9312d4af87832181.png"/>
        </div>
        <div className="category">
          <h2>Custom T-Shirts</h2>
          <p>Design your own t-shirt for any occasion.</p>
          <img src="https://product-demo.studiowombat.com/wp-content/uploads/2020/07/shirt-white-1.jpg"/>
        </div>
        <div className="category">
          <h2>Engraved Jewelry</h2>
          <p>Make your jewelry special with custom engravings.</p>
          <img src="https://i-bosity-com.oss-cn-hongkong.aliyuncs.com/product_img/275/56032666/56032666_10_image.jpg?x-oss-process=image/resize,p_100/watermark,image_d2F0ZXJtYXJrX2ltZy8xNzExMTQwOC9kZWZhdWx0LnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSxQXzk5,g_nw,x_0,y_0"/>
        </div>
      </div>
      
      <button className="shopping-button">Start Shopping</button>
      
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
