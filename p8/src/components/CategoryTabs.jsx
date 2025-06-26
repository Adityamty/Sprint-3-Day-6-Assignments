import React from 'react';

const categories = ['All', 'Electronics', 'Clothing'];

export default function CategoryTabs({ selected, onSelect }) {
  return (
    <div className="tabs">
      {categories.map(cat => (
        <button
          key={cat}
          className={selected === cat ? 'active' : ''}
          onClick={() => onSelect(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
