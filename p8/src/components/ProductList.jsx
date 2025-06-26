import React, { useState, useEffect, useCallback } from 'react';
import { fetchProducts } from '../api/products';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import ProductCard from './ProductCard';
import Loader from './Loader';

const PAGE_SIZE = 12;

export default function ProductList({ category }) {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  // Reset when category changes
  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
  }, [category]);

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    fetchProducts({ page, limit: PAGE_SIZE, category })
      .then(({ products: newProducts, hasMore }) => {
        if (!ignore) {
          setProducts(prev => page === 1 ? newProducts : [...prev, ...newProducts]);
          setHasMore(hasMore);
        }
      })
      .finally(() => !ignore && setLoading(false));
    return () => { ignore = true; };
  }, [page, category]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) setPage(p => p + 1);
  }, [loading, hasMore]);

  const loaderRef = useInfiniteScroll(loadMore, loading, hasMore);

  return (
    <div className="product-list" id="productList">
      {products.map(p => <ProductCard key={p.id} product={p} />)}
      {loading && <Loader />}
      <div ref={loaderRef} style={{ height: 1 }} />
      {!hasMore && <div className="end-message">No more products.</div>}
    </div>
  );
}
