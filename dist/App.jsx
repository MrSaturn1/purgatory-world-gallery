import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// Import your page components
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import GalleryPage from './pages/GalleryPage';
import NotFoundPage from './pages/NotFoundPage';
const App = () => {
    return (<Router>
      <div>
        {/* Navigation and other layout components can go here */}
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/gallery" element={<GalleryPage />}/>
          {/* Add more routes as needed */}
          <Route element={<NotFoundPage />}/>
        </Routes>
      </div>
    </Router>);
};
export default App;
