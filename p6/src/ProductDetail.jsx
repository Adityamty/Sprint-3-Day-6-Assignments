import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://dummyjson.com/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div style={{ maxWidth: 700, margin: '40px auto', padding: 24 }}>
      {/* Breadcrumbs */}
      <nav aria-label="breadcrumb" style={{ marginBottom: 16 }}>
        <ol style={{ display: 'flex', gap: 8, listStyle: 'none', padding: 0 }}>
          <li><Link to="/">Products</Link> /</li>
          <li><span>{product.title}</span></li>
        </ol>
      </nav>
      <button onClick={() => navigate(-1)} style={{ marginBottom: 24 }}>Go Back</button>
      <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <img
          src={product.thumbnail}
          alt={product.title}
          style={{ width: 300, height: 300, objectFit: 'cover', borderRadius: 8, background: '#eee' }}
        />
        <div>
          <h2>{product.title}</h2>
          <p style={{ fontWeight: 'bold', fontSize: 20 }}>${product.price}</p>
          <p>{product.description}</p>
          <p>Stock: <span style={{ fontWeight: 'bold' }}>{product.stock}</span></p>
          <p>Category: {product.category}</p>
          <button
            onClick={() => addToCart(product)}
            style={{ marginTop: 16 }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
