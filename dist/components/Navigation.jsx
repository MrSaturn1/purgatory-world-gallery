// src/components/Navigation.tsx
import React from 'react';
import { Link } from 'react-router-dom';
const Navigation = () => {
    return (<nav>
      <Link to="/">Home</Link>
      <Link to="/gallery">Gallery</Link>
      {/* Add more links as needed */}
    </nav>);
};
export default Navigation;
