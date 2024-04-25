import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Layout from './layout';
import HomePage from './pages/HomePage';
import UserPage from './pages/UserPage';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/user" element={<UserPage />} />
      </Route>
    </Routes>
  </Router>
);

export default App;