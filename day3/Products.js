import React from 'react';
import './Products.css';

const Products = () => {
  const products = [
    { name: 'Mug', products: ['Personalized Mug', 'Custom Mug', 'Photo Mug'] },
    { name: 'T-Shirt', products: ['Custom T-Shirt', 'Design Your Own T-Shirt', 'Funny T-Shirt'] },
    { name: 'Jewelry', products: ['Engraved Jewelry', 'Custom Necklace', 'Personalized Ring'] },
  ];

  return (
    <div className="products">
      <h1>Our Products</h1>
      <div className="product-categories">
        {products.map((product) => (
          <div className="product-category" key={product.name}>
            <h2>{product.name}</h2>
            <ul>
              {product.products.map((productName) => (
                <li key={productName}>{productName}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;