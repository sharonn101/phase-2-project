import { Route, Routes } from 'react-router-dom';
import Dashboard from './components/pages/Dashboard';
import Home from './components/pages/Home';
import ProductDetail from './components/pages/ProductDetail';
import Admin from './components/pages/Admin';
import NotFound from './components/pages/NotFound';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import './App.css';



function App() {
  return (
    <div className="App">
      <Dashboard />
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/admin" element={<Admin />} />
        {/* <Route path="/dashboard" element={<Dashboard products={testProducts} />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
