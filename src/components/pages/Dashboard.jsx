import React, { useEffect, useState } from 'react';
import './Dashboard.css';

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const LOW_STOCK_THRESHOLD = 3;

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  const lowStockProducts = products.filter(product => product.stock <= LOW_STOCK_THRESHOLD);

  if (loading) return <p className="loading-text">Loading inventory...</p>;

  return (
    <div className="dashboard">
      <h2 className="dashboard-title">📦 Inventory Dashboard</h2>

      {lowStockProducts.length > 0 ? (
        <div className="alerts">
          {lowStockProducts.map(product => (
            <p key={product.id} className="alert-text">
              ⚠️ <strong>{product.title}</strong> is running low! Only {product.stock} left in stock.
            </p>
          ))}
        </div>
      ) : (
        <p className="success-text">✅ All products are well stocked!</p>
      )}
    </div>
  );
}

export default Dashboard;
