// pages/_app.js
import './global.css';  // Adjust the path to your global styles file
// import Header from '../components/Header'; // Commented out or removed
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <>
      {/* Header removed from here */}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
