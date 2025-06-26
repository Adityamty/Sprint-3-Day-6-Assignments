import React, { useState, useRef, useEffect } from 'react';
import CategoryTabs from './components/CategoryTabs';
import ProductList from './components/ProductList';
import './styles.css';

export default function App() {
  const [category, setCategory] = useState('All');
  const listRef = useRef();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [category]);

  return (
    <div className="container">
      <h2>Products</h2>
      <CategoryTabs selected={category} onSelect={setCategory} />
      <ProductList category={category} ref={listRef} />
    </div>
  );
}
