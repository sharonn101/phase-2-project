import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route } from 'react-router-dom'
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './components/pages/Home';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;