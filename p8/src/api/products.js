// Mock API function (replace with real API calls)
export async function fetchProducts({ page, limit, category }) {
  // Simulate API delay
  await new Promise(res => setTimeout(res, 800));
  // Mock data
  const allProducts = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    category: ['All', 'Electronics', 'Clothing'][i % 3],
    price: (Math.random() * 100).toFixed(2),
  }));

  const filtered = category === 'All'
    ? allProducts
    : allProducts.filter(p => p.category === category);

  const start = (page - 1) * limit;
  const end = start + limit;
  return {
    products: filtered.slice(start, end),
    hasMore: end < filtered.length,
  };
}
