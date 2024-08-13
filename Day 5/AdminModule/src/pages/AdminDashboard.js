import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    rating: '',
    count: '',
    imageUrl: ''
  });

  useEffect(() => {
    // Fetch users, products, and orders
    const fetchData = async () => {
      try {
        const usersResponse = await axios.get('http://localhost:5000/users');
        setUsers(usersResponse.data);

        const productsResponse = await axios.get('http://localhost:5000/products');
        // Convert the product data
        const productsData = productsResponse.data.map(product => ({
          ...product,
          price: parseFloat(product.price),
          rating: parseInt(product.rating, 10),
          count: parseInt(product.count, 10),
        }));
        setProducts(productsData);

        const ordersResponse = await axios.get('http://localhost:5000/orders');
        setOrders(ordersResponse.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  const handleAddProduct = async () => {
    try {
      const productToAdd = {
        ...newProduct,
        price: parseFloat(newProduct.price),
        rating: parseInt(newProduct.rating, 10),
        count: parseInt(newProduct.count, 10),
      };
      const response = await axios.post('http://localhost:5000/products', productToAdd);
      setProducts([...products, response.data]);
      setNewProduct({ name: '', price: '', rating: '', count: '', imageUrl: '' }); // Reset the form
    } catch (error) {
      console.error("Error adding product", error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/products/${productId}`);
      setProducts(products.filter(product => product.id !== productId));
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <section>
        <h2>Users</h2>
        <ul>
          {users.map(user => (
            <li key={user.id}>{user.name} - {user.email}</li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Products</h2>
        <ul>
          {products.map(product => (
            <li key={product.id}>
              {product.name} - ${product.price.toFixed(2)} - Rating: {product.rating} - Count: {product.count}
              <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
            </li>
          ))}
        </ul>
        <h3>Add New Product</h3>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Rating"
            value={newProduct.rating}
            onChange={(e) => setNewProduct({ ...newProduct, rating: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Count"
            value={newProduct.count}
            onChange={(e) => setNewProduct({ ...newProduct, count: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newProduct.imageUrl}
            onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
            required
          />
          <button type="submit" onClick={handleAddProduct}>Add Product</button>
        </form>
      </section>
      <section>
        <h2>Orders</h2>
        <ul>
          {orders.map(order => (
            <li key={order.id}>Order ID: {order.id}, Payment Method: {order.paymentMethod}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AdminDashboard;
