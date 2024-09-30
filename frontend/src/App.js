import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Users from './components/Users';
import Products from './components/Products';
import Menu from './components/Menu';


function App() {
  return (
    <Router>
      <div>
        <Menu />
        <div className="container mt-4">
          <Routes>
            <Route path="/users" element={<Users />} />
            <Route path="/products" element={<Products />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
