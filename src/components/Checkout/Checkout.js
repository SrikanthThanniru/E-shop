import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Checkout.css'; // Import the CSS file

const Checkout = ({ cartItems, handleResetCart }) => {
  const navigate = useNavigate();
  
  const handleOrderPlacement = () => {
    // Simulate order placement
    alert('Order placed successfully!');
    handleResetCart(); // Reset the cart
    navigate("/thank-you");
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <ul className="checkout-items">
        {cartItems.map((item) => (
          <li key={item.id} className="checkout-item">
            <img src={item.imageUrl} alt={item.name} className="checkout-item-image" />
            <div className="checkout-item-details">
              <span className="checkout-item-name">{item.name}</span>
              <span className="checkout-item-price">${item.price}</span>
              <span className="checkout-item-quantity">X {item.quantity}</span>
            </div>
            <span className="checkout-item-price">Total Price ${item.price * item.quantity}</span>
          </li>
        ))}
      </ul>
      <button className="place-order-button" onClick={handleOrderPlacement}>
        Place Order
      </button>
    </div>
  );
};

export default Checkout;
