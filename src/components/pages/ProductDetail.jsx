import { useParams } from 'react-router-dom';
import { getProductsFn } from "/src/services/api";
import {useEffect, useState} from "react"

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProductsFn().then(products => {
      const single = products.find(product => product.id === Number(id));
      setProduct(single);
    });
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-detail">
      <h2>{product.title}</h2>
      <img src={product.thumbnail} alt={product.title} style={{ width: '300px' }} />
      <p><strong>Price:</strong> ${product.price}</p>
      <p><strong>Description:</strong> {product.description}</p>
      <p><strong>Category:</strong> {product.category}</p>
    </div>
  );
}

export default ProductDetail;
