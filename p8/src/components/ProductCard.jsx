import React from 'react';

export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <h4>{product.name}</h4>
      <div>Category: {product.category}</div>
      <div>Price: ${product.price}</div>
    </div>
  );
}
