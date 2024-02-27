import React, { useEffect, useState } from 'react';
import ArtworkPreview from './components/ArtworkPreview';
// src/index.tsx
import ReactDOM from 'react-dom';
import App from './App'; // Import the App component
//import './index.css'; // Optional: Global styles
ReactDOM.render(<React.StrictMode>
    <App />
  </React.StrictMode>, document.getElementById('root'));
const Home = () => {
    // State to hold the generated artwork
    const [artwork, setArtwork] = useState(null);
    // Function to call the generateArt API route
    const fetchArtwork = async () => {
        try {
            // Adjust the endpoint as necessary for your API route
            const response = await fetch('/api/generateArt');
            if (!response.ok) {
                // Handle HTTP errors
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json(); // Assume the response is JSON
            if (data.imageUrl) {
                // Update the artwork state with the new data
                setArtwork({
                    title: data.title || "Generated Artwork", // Provide default values as needed
                    imageUrl: data.imageUrl,
                    artist: data.artist || "AI Artist",
                    artistUrl: data.artistUrl,
                    biography: data.biography,
                });
            }
            else {
                console.error('The response does not contain an imageUrl');
            }
        }
        catch (error) {
            console.error('Failed to fetch artwork:', error);
        }
    };
    // Use useEffect to call fetchArtwork when the component mounts
    useEffect(() => {
        fetchArtwork();
    }, []); // Empty dependency array means this effect runs once on mount
    return (<div>
      <h1>Welcome to Purgatory World Gallery!</h1>
      <p>Please support our artists and their art before they return to the ether.</p>

       {/* Render ArtworkPreview only if artwork state is not null */}
      {artwork && (<>
          <ArtworkPreview title={artwork.title} imageUrl={artwork.imageUrl} artist={artwork.artist} style={{ width: '256px', height: '256px', objectFit: 'cover' }}/>
          <ArtworkPreview title="" imageUrl={artwork.artistUrl} artist="" style={{ width: '128px', height: '128px', objectFit: 'cover' }}/>
          <p>{artwork.biography}</p>
        </>)}
    </div>);
};
export default Home;
