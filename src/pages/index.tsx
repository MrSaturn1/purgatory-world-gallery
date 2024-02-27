import React from 'react';
import Link from 'next/link';

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Welcome to Purgatory World Gallery!</h1>
      <p>Please support our artists and their art before they return to the ether.</p>
      {/* Example link to another page */}
      <Link href="/GalleryPage">Visit the Gallery</Link>
    </div>
  );
};

export default HomePage;

