import React, { useState, useEffect } from 'react';
import useDebounce from './utils/useDebounce';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  // Debounced search term
  const debouncedSearch = useDebounce(search, 400);

  // Fetch products and categories
  useEffect(() => {
    setLoading(true);
    fetch('https://dummyjson.com/products?limit=100')
      .then(res => res.json())
      .then(data => {
        setProducts(data.products || []);
        setFiltered(data.products || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
    fetch('https://dummyjson.com/products/categories')
      .then(res => res.json())
      .then(data => setCategories(Array.isArray(data) ? data : []))
      .catch(() => setCategories([]));
  }, []);

  // Filtering logic
  useEffect(() => {
    let result = products;

    // Filter by name (title)
    if (debouncedSearch.trim()) {
      result = result.filter(product =>
        product.title.toLowerCase().includes(debouncedSearch.trim().toLowerCase())
      );
    }

    // Filter by category
    if (category) {
      result = result.filter(product => product.category === category);
    }

    // Filter by price range
    if (minPrice !== '') {
      result = result.filter(product => product.price >= parseFloat(minPrice));
    }
    if (maxPrice !== '') {
      result = result.filter(product => product.price <= parseFloat(maxPrice));
    }

    setFiltered(result);
  }, [debouncedSearch, category, minPrice, maxPrice, products]);

  return (
    <div style={{ maxWidth: 900, margin: '40px auto', padding: 24 }}>
      <h2>Product List</h2>
      <div style={{ display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ padding: 8, flex: 1, minWidth: 180 }}
        />
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          style={{ padding: 8, minWidth: 140 }}
        >
          <option value="">All Categories</option>
          {categories
            .filter(cat => typeof cat === 'string' && cat.length > 0)
            .map(cat => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
        </select>
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={e => setMinPrice(e.target.value)}
          style={{ padding: 8, width: 100 }}
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={e => setMaxPrice(e.target.value)}
          style={{ padding: 8, width: 100 }}
        />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : filtered.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 24
        }}>
          {filtered.map(product => (
            <div key={product.id} style={{
              border: '1px solid #ddd',
              borderRadius: 8,
              padding: 16,
              background: '#fff'
            }}>
              <img
                src={product.thumbnail}
                alt={product.title}
                style={{ width: '100%', height: 150, objectFit: 'cover', borderRadius: 6 }}
              />
              <h3 style={{ margin: '12px 0 4px' }}>{product.title}</h3>
              <p style={{ margin: '4px 0', color: '#555' }}>{product.category}</p>
              <p style={{ margin: '4px 0', fontWeight: 'bold' }}>${product.price}</p>
              <p style={{ fontSize: 14, color: '#666' }}>{product.description.slice(0, 60)}...</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
