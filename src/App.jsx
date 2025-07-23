// Importing necessary components and dependencies from React Router and our local files
import { Route, Routes } from 'react-router-dom';

// Pages
import Dashboard from './components/pages/Dashboard';
import Home from './components/pages/Home';
import ProductDetail from './components/pages/ProductDetail';
import Admin from './components/pages/Admin';
import NotFound from './components/pages/NotFound';

// Layout components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Styles
import './App.css';

function App() {
  return (
    <div className="App">
      {/* Header will be visible on all pages */}
      <Header />

      {/* Define application routes */}
      <Routes>
       
        <Route path="/" element={<Home />} />

        
        <Route path="/products/:id" element={<ProductDetail />} />

       
        <Route path="/admin" element={<Admin />} />

        
        <Route path="/dashboard" element={<Dashboard />} />

        
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Footer will also be visible on all pages */}
      <Footer />
    </div>
  );
}

export default App;
