import React, { useEffect, useState } from 'react';
import styles from './GalleryPage.module.css';
import axios from 'axios';

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

  // State for user input and chatbot response
  const [userInput, setUserInput] = useState('');
  const [chatbotResponse, setChatbotResponse] = useState('Yes?');

  useEffect(() => {
    const fetchArtworks = async () => {
      // const today = new Date().toISOString().slice(0, 10); // Format: YYYY-MM-DD
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

  // Function to send user input to the chatbot and handle the response
  // axios version
  /*const handleSendInput = async () => {
    if (userInput) {
      try {
        const response = await axios.post('/api/galleristBot', {
          userInput
        });

        // Process the response data
        const message = response.data.choices[0].delta.content;
        if (message) {
          setChatbotResponse((prev) => prev + message);
        }

      } catch (error) {
        console.error(error);
      }
    }
  };*/

  // Function to send user input to the chatbot and handle the response
  const handleSendInput = async () => {
    try {
      const response = await fetch('/api/galleristBot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setChatbotResponse(data.reply);
      setUserInput('');
    } catch (error) {
      console.error('Error sending input:', error);
    }
  };

  return (
    <div className={styles.galleryWrapper}>
      <h1>PURGATORY WORLD GALLERY</h1>
      <div className={styles["artwork-grid"]}>
        {artworks.map((artwork) => (
          <div key={artwork.id} className={styles["artwork-item"]} onClick={() => setSelectedArtwork(artwork)}>
            <h2>{artwork.title}</h2>
            <img src={artwork.imageUrl} alt={artwork.title} />
          </div>
        ))}
      </div>
      {selectedArtwork && (
        <div className={styles["modal-overlay"]} onClick={() => setSelectedArtwork(null)}>
          <div className={styles["modal"]} onClick={(e) => e.stopPropagation()}> {/* Prevent click inside modal from closing it */}
            <h2>{selectedArtwork.title}</h2>
            <img src={selectedArtwork.imageUrl} alt={selectedArtwork.title} style={{ maxWidth: '100%', height: 'auto' }} />
            <img src={selectedArtwork.artistUrl} alt={selectedArtwork.artist} className={styles['artist-img']} />
            <p>Artist: {selectedArtwork.artist}</p>
            <p>{selectedArtwork.biography}</p>
            <button onClick={() => setSelectedArtwork(null)}>Close</button>
          </div>
        </div>
      )}
      <div className={styles.chatContainer}>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Any questions?"
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              handleSendInput();
            }
          }}
        />
        <button onClick={handleSendInput}>Send</button>
      </div>
      <div className={styles.chatBubble}>
        <p>{chatbotResponse}</p>
      </div>
      <div className={styles.avatar}></div>
    </div>
  );
};

export default GalleryPage;


