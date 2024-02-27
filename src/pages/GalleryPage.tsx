import React, { useEffect, useState } from 'react';
import './GalleryPage.module.css';

interface ArtworkMetadata {
  id: string; // Keep if you have a unique identifier for each artwork
  title: string;
  imageUrl: string;
  artistUrl: string;
  artist: string; // Adding the artist name field
  biography: string;
}

const GalleryPage: React.FC = () => {
  const [artworks, setArtworks] = useState<ArtworkMetadata[]>([]);
  // State to hold the selected artwork for details modal
  const [selectedArtwork, setSelectedArtwork] = useState<ArtworkMetadata | null>(null);

  useEffect(() => {
    const fetchArtworks = async () => {
      const today = new Date().toISOString().slice(0, 10); // Format: YYYY-MM-DD
      try {
        const response = await fetch('/api/getArtwork');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("gp data:", data);
        console.log("gp data.artworks:", data.artworks);
        setArtworks(data.artworks);
      } catch (error) {
        console.error('Failed to fetch artworks:', error);
      }
    };

    fetchArtworks();
  }, []);

  // Handler to set the selected artwork
  const handleSelectArtwork = (artwork: ArtworkMetadata) => {
    setSelectedArtwork(artwork);
  };

  return (
    <div>
      <h1>Gallery Page</h1>
      <div className="artwork-grid">
        {artworks.map((artwork) => (
          <div key={artwork.id} className="artwork-item" onClick={() => handleSelectArtwork(artwork)}>
            <h2>{artwork.title}</h2>
            <img src={artwork.imageUrl} alt={`"${artwork.title}"`} />
            <img src={artwork.artistUrl} alt={`${artwork.artist}`} />
            <p>Artist: {artwork.artist}</p> {/* Displaying the artist name */}
            <p>{artwork.biography}</p>
          </div>
        ))}
      </div>
      {/* Modal for displaying selected artwork details */}
      {selectedArtwork && (
        <div className="modal-overlay" onClick={() => setSelectedArtwork(null)}>
            <div className="modal">
              <h2>{selectedArtwork.title}</h2>
              <img src={selectedArtwork.imageUrl} alt={`Artwork titled "${selectedArtwork.title}"`} style={{ maxWidth: '100%' }} />
              <img src={selectedArtwork.artistUrl} alt={`Portrait of ${selectedArtwork.artist}`} style={{ maxWidth: '100%' }} />
              <p>Artist: {selectedArtwork.artist}</p>
              <p>{selectedArtwork.biography}</p>
              <button onClick={() => setSelectedArtwork(null)}>Close</button>
            </div>
        </div>
        )}
    </div>
  );
};

export default GalleryPage;


