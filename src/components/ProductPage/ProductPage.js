import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ProductPage.css'; // Create a CSS file for styling

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Fetch product details when the component mounts
    const fetchProduct = async () => {
      const response = await axios.get(`http://localhost:3000/products/${id}`);
      setProduct(response.data);
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-page-container">
     
      <img src={product.imageUrl} alt={product.name} className="product-detail-image" />
      <div className='product-page-details'>
      <h1>{product.name}</h1>
      <p><strong>Category:</strong> {product.category}</p>
      <p><strong>Price:</strong> ${product.price}</p>
      <p><strong>Description:</strong> {product.description}</p>
      <p><strong>Rating:</strong> ${product.rating}</p>

      {/* Add more details if needed */}
      </div>
    
    </div>
  );
};

export default ProductPage;
