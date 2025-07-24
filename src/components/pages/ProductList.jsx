import { useEffect, useState } from 'react';
import { getProductsFn } from '/src/services/api';
import { Link } from 'react-router-dom';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProductsFn().then(setProducts);
  }, []);

  return (
    <div>
      <h1>Product List</h1>
      <div>
        {products.map(product => (
          <Link
            to={`/products/${product.id}`}
            key={product.id}
            
            }}
          >
            <img
              src={product.thumbnail}
              alt={product.title}
            
            />
            <h3>{product.title}</h3>
            <p>${product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProductList
