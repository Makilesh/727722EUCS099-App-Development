import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/ProductList.css';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [addedProducts, setAddedProducts] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('none');
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/products')
      .then(response => {
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    let updatedProducts = [...products];

    if (searchTerm) {
      updatedProducts = updatedProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortOption === 'price-low-high') {
      updatedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-high-low') {
      updatedProducts.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(updatedProducts);
  }, [sortOption, products]);

  const handleSearch = () => {
    setFilteredProducts(products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    ));
    setSearchTerm(''); // Clear the search input
  };

  const addToCart = (product, quantity = 1) => {
    axios.get(`http://localhost:5000/cart?productId=${product.id}`)
      .then(response => {
        if (response.data.length > 0) {
          const existingItem = response.data[0];
          updateCartItem(existingItem.id, existingItem.quantity + quantity);
        } else {
          const cartItem = {
            productId: product.id,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
            quantity
          };
          axios.post('http://localhost:5000/cart', cartItem)
            .then(() => {
              setAddedProducts(prevState => ({ ...prevState, [product.id]: true }));
              setTimeout(() => {
                setAddedProducts(prevState => ({ ...prevState, [product.id]: false }));
              }, 3000);
            })
            .catch(error => console.error("Error adding to cart", error));
        }
      })
      .catch(error => {
        console.error("Error fetching cart items", error);
        navigate('/login');
      });
  };

  const updateCartItem = (id, quantity) => {
    axios.patch(`http://localhost:5000/cart/${id}`, { quantity })
      .then(() => console.log("Cart item updated"))
      .catch(error => console.error("Error updating cart item", error));
  };

  const handleShare = (product) => {
    const shareData = {
      title: product.name,
      text: `Check out this product: ${product.name}`,
      url: window.location.href
    };

    if (navigator.share) {
      navigator.share(shareData)
        .then(() => console.log('Share successful'))
        .catch(error => console.error('Error sharing', error));
    } else {
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert('Product link copied to clipboard'))
        .catch(error => console.error('Error copying to clipboard', error));
    }
  };

  return (
    <div className="product-list-container">
      <button
        className="hamburger-menu"
        onClick={() => setIsSidebarVisible(!isSidebarVisible)}
      ><img width="50px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAYFBMVEX///8CAgIAAADX19ewsLDFxcW2trbBwcELCwuWlpbz8/PZ2dnc3NxZWVlsbGzj4+Opqak0NDSfn5+FhYVhYWF9fX0mJiZRUVH39/dycnKOjo4WFhbs7OwdHR3Nzc1GRkZeN5/TAAABVElEQVR4nO3cCW7CMBAF0BB2SllLV0rvf8sGpB7BM+rkvQtEX5Zjx5Nx1wEAAAAAAAAAAAAAAAAAAEC0zdO0re17ar7pc9/carfPC7hun+9hkRXw0PeTCH0/zwl4XcUEHCIecybjKSrgMIjLlIS7sIST/pyS8C0w4UdKwpfAhJeUhJ+BCWcpCbdBi8UQ8OuakrA7h62Hh5yA95kYkHF4Rs6b9OEQsWf7zlkM/9wWs7YW09R8AAAAAP/Fft7YLbE+OlgeA87afhLPoi4B+e5OWQHXYWfeSWXufVzd4nWTknAdWHvKGcTI+qEacBv1x7D+PKz/Lq2/Ho5gTxO1L73lBRxsW39bzHO/LQAAAAD+i+r/6pfvtyjfMxPX95R0JFy/d61+/2H9HtL6NeD6vdz1+/Hr36lQ/16MEdxtMoL7abr6dwwBAAAAAAAAAAAAAAAAAAAwTr/LxSR1bBQKdAAAAABJRU5ErkJggg=="></img>
        
      </button>
      {isSidebarVisible && (
        <aside className="sidebar">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch} className="search-button">
              <i className="fa fa-search"></i>
            </button>
          </div>
          <select onChange={(e) => setSortOption(e.target.value)} value={sortOption}>
            <option value="none">Sort By</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
          </select>
        </aside>
      )}
      <div className="product-list">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.imageUrl} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <div className="product-rating-container">
              <span className="product-rating">{product.rating} ★</span>
              <span className="product-rating-count">({product.count})</span>
            </div>
            <p>${product.price.toFixed(2)}</p>
            <label>
              Quantity:
              <select onChange={(e) => addToCart(product, parseInt(e.target.value))}>
                {[...Array(10).keys()].map(n => (
                  <option key={n + 1} value={n + 1}>{n + 1}</option>
                ))}
              </select>
            </label>
            <button
              onClick={() => addToCart(product)}
              disabled={addedProducts[product.id]}
            >
              {addedProducts[product.id] ? 'Added to Cart' : 'Add to Cart'}
            </button>
            <button onClick={() => handleShare(product)}>Share</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
