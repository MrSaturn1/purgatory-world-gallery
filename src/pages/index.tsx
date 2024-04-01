import React from 'react';
import Link from 'next/link';
import styles from './index.module.css'; // Adjust the path if needed

const HomePage: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.textBox}>
        <h1>Welcome to Purgatory World Gallery!</h1>
        <p>Please support our artists and their art before they return to the ether.</p>
        <Link href="/GalleryPage" passHref>
          <button className={styles.link}>Visit the Gallery</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
