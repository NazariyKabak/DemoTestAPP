import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../../../TestAPP/ad-dashboard/src/components/Home';
import About from '../../../TestAPP/ad-dashboard/src/components/About';
import Dashboard from '../../../TestAPP/ad-dashboard/src/components/Dashboard';
import Navbar from '../../../TestAPP/ad-dashboard/src/components/Navbar';

const App: React.FC = () => {
  return (
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
  );
}
export default App;

