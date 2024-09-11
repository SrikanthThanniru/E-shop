import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = ({ cartItems, handleRemoveFromCart, handleUpdateQuantity }) => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleQuantityChange = (id, newQuantity) => {
    handleUpdateQuantity(id, newQuantity);
  };

  const handleRemoveItem = (id) => {
    handleRemoveFromCart(id);
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Cart</h2>
      <ul className="cart-items">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <li key={item.id} className="cart-item">
              <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <span className="cart-item-name">{item.name}</span>
                <span className="cart-item-price">Price: ${item.price}</span>
                <div className="cart-item-quantity">
                  <button 
                    className="quantity-button" 
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    readOnly
                    className="cart-item-quantity-input"
                  />
                  <button 
                    className="quantity-button" 
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <button 
                  className="cart-item-remove-button" 
                  onClick={() => handleRemoveItem(item.id)}
                >
                  Remove
                </button>
              </div>
            </li>
          ))
        ) : (
          <div className="empty-cart-container">
            <p>Your cart is empty.</p>
            <img 
              alt="Empty Cart" 
              src="https://cdn3.iconfinder.com/data/icons/shopping-and-ecommerce-28/90/empty_cart-512.png" 
              className="empty-cart-image"
            />
          </div>
        )}
      </ul>
      {cartItems.length > 0 && (
        <div className="total-price">
          <h3>Total Price: ${calculateTotalPrice()}</h3>
          <button 
            className="checkout-button" 
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
