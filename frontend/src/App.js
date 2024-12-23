import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LocationList from './components/LocationList';
import LocationForm from './components/LocationForm';
import LocationSearch from './components/LocationSearch';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LocationList />} />
        <Route path="/cadastro" element={<LocationForm />} />
        <Route path="/busca" element={<LocationSearch />} />
      </Routes>
    </Router>
  );
}

export default App;
