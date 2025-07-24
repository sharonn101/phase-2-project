import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetail from './components/pages/ProductDetail';

function App() {
  return (
    
      <div className="app">
        <h1 className="app-container">Inventory Manager</h1>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
        </Routes>
      </div>
  );
}

export default App;
