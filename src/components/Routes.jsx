import React from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';

import { Results } from './Result';

export const Routess = () => (
  <div className="p-4">
    <Routes>
      <Route path="/" element={<Navigate to="/search" />} />
      <Route path="/search" element={<Results />} />
      <Route path="/images" element={<Results />} />
      <Route path="/news" element={<Results />} />
      <Route path="/videos" element={<Results />} />
    </Routes>
  </div>
);

// export default Routess; // Update export statement
