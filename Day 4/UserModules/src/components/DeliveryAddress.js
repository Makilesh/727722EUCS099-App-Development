import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/DeliveryAddress.css';

const DeliveryAddress = () => {
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    StreetName: '',
    city: '',
    district:'',
    state: '',
    pin: ''
  });
  const [selectedAddress, setSelectedAddress] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = () => {
    axios.get('http://localhost:5000/addresses')
      .then(response => setAddresses(response.data))
      .catch(error => console.error(error));
  };

  const addAddress = () => {
    axios.post('http://localhost:5000/addresses', newAddress)
      .then(response => {
        setAddresses([...addresses, response.data]);
        setNewAddress({
            StreetName: '',
            city: '',
            district:'',
            state: '',
            pin: ''
        });
      })
      .catch(error => console.error(error));
  };

  const removeAddress = (id) => {
    axios.delete(`http://localhost:5000/addresses/${id}`)
      .then(() => {
        setAddresses(addresses.filter(address => address.id !== id));
      })
      .catch(error => console.error(error));
  };

  const proceedToPayment = () => {
    if (!selectedAddress) {
      alert('Please select a delivery address.');
      return;
    }
    navigate('/payment-method', { state: { selectedAddress } });
  };

  return (
    <div className="delivery-address-page">
      <h1>Select Delivery Address</h1>
      {addresses.map(address => (
        <div key={address.id} className="address-item">
          <input
            type="radio"
            id={`address-${address.id}`}
            name="address"
            value={address.id}
            onChange={() => setSelectedAddress(address)}
          />
          <label htmlFor={`address-${address.id}`}>
            {address.StreetName}, {address.city}, {address.district},{address.state}, {address.pin}
          </label>
          <button onClick={() => removeAddress(address.id)}>Remove</button>
        </div>
      ))}
      <div className="new-address-form">
        <input
          type="text"
          placeholder="Street Name"
          value={newAddress.StreetName}
          onChange={(e) => setNewAddress({ ...newAddress, StreetName: e.target.value })}
        />
        <input
          type="text"
          placeholder="City"
          value={newAddress.city}
          onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
        />
        <input
          type="text"
          placeholder="District"
          value={newAddress.district}
          onChange={(e) => setNewAddress({ ...newAddress, district: e.target.value })}
        />
        <input
          type="text"
          placeholder="State"
          value={newAddress.state}
          onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
        />
        <input
          type="text"
          placeholder="PIN Code"
          value={newAddress.pin}
          onChange={(e) => setNewAddress({ ...newAddress, pin: e.target.value })}
        />
        <button onClick={addAddress}>Add Address</button>
      </div>
      <button className="proceed-button" onClick={proceedToPayment}>Proceed to Payment</button>
    </div>
  );
};

export default DeliveryAddress;
