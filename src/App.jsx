import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getProductsFn } from './services/api';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/pages/Home';
import ProductDetail from './components/pages/ProductDetail';
import Admin from './components/pages/Admin';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProductsFn()
      .then(data => {
        if (data) {
          setProducts(data);
        }
      })
      .catch(error => console.error("Error fetching products:", error));
  }, []);

  const handleUpdateProduct = (updatedProduct) => {
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home products={products} onUpdateProduct={handleUpdateProduct} onDeleteProduct={handleDeleteProduct} />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;