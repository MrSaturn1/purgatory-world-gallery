// components/Header.js or components/Header.tsx
import Link from 'next/link';

const Header = () => (
  <header>
    {/* Style your header as needed */}
    <nav>
      {/* Example navigation links */}
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/GalleryPage">Gallery</Link>
      <Link href="/contact">Contact</Link>
    </nav>
  </header>
);

export default Header;
