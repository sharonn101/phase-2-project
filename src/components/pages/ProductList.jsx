import { useEffect, useState } from 'react';
import { getProductsFn } from '/src/services/api';
import { Link } from 'react-router-dom';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProductsFn().then(setProducts);
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Product List</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
        {products.map(product => (
          <Link
            to={`/products/${product.id}`}
            key={product.id}
            
            }}
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px' }}
            />
            <h3 style={{ marginTop: '0.5rem' }}>{product.title}</h3>
            <p style={{ fontWeight: 'bold' }}>${product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProductList
