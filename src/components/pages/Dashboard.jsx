
import React, { useEffect, useState } from 'react';

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

  // Filter products that are below or equal to the low stock threshold
  const lowStockProducts = products.filter(product => product.stock <= LOW_STOCK_THRESHOLD);
   
  // Show a loading message while data is being fetched
  if (loading) return <p>Loading inventory...</p>;

  return (
    <div className="dashboard">
      <h2>📦 Inventory Dashboard</h2>

      {/* Display low-stock warnings or a message saying all products are fine */}
      {lowStockProducts.length > 0 ? (
        <div className="alerts">
          {lowStockProducts.map(product => (
            <p key={product.id} style={{ color: "red", fontWeight: "bold" }}>
              ⚠️ {product.title} is running low! Only {product.stock} left in stock.
            </p>
          ))}
        </div>
      ) : (
        <p style={{ color: "green" }}>✅ All products are well stocked!</p>
      )}
    </div>
  );
}

export default Dashboard;