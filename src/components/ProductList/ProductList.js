import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductItem from '../ProductItem/ProductItem';
import './ProductList.css'; // Import the CSS file

const ProductList = ({ handleAddToCart }) => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('http://localhost:3000/products');
      setProducts(response.data);
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="product-list-container">
      <h2>Product List</h2>
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input" // Apply class to input
      />
      <ul>
        {filteredProducts.map(product => (
          <ProductItem key={product.id} product={product}  handleAddToCart={handleAddToCart} />
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
