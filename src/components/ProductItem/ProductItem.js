import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './ProductItem.css'; // Assuming you have a CSS file for styling

const ProductItem = ({ product, handleAddToCart }) => {
  const addToCart = () => {
    console.log('Adding to cart:', product); // Debugging line
    handleAddToCart(product);
  };

  return (
    <li className="product-item">
      <Link to={`/product/${product.id}`} className="product-link">
        <img src={product.imageUrl} alt={product.name} className="product-image" />
        <div className="product-details">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-price">${product.price}</p>
          <p className="product-price">{product.rating}</p>

        </div>
      </Link>
      <button onClick={addToCart} className="add-to-cart-button">
        Add to Cart
      </button>
    </li>
  );
};

export default ProductItem;
