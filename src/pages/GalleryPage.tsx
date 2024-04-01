import React, { useEffect, useState } from 'react';
import styles from './GalleryPage.module.css';
import axios from 'axios';

interface ArtworkMetadata {
  id: string; // Keep if you have a unique identifier for each artwork
  title: string;
  description: string;
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
  const [conversationHistory, setConversationHistory] = useState([]);

  useEffect(() => {
    const fetchArtworks = async () => {
      // const today = new Date().toISOString().slice(0, 10); // Format: YYYY-MM-DD
      try {
        const response = await fetch('/api/getArtwork2');
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

  const handleArtworkClick = (artwork) => {
    setSelectedArtwork(artwork);

    const artworkInfo = {
      role: "system",
      content: `Viewing artwork: ${artwork.title}. Description: ${artwork.description}. Artist: ${artwork.artist}`
    };

    setConversationHistory([...conversationHistory, artworkInfo]);
  };

  // Function to send user input to the chatbot and handle the response
  const handleSendInput = async () => {
    const artistDetails = {
      artist: "Tatsuo Nakamura", // Replace with actual default artist name
      biography: "Born in the heart of Tokyo in 1986, Tatsuo Nakamura was a child of contrasts. Growing up in the bustling Shibuya district, he found solace in the quiet corners of his family's small apartment, where he would draw for hours, escaping the city's relentless rhythm. A gentle soul with a deep affinity for the digital world, Tatsuo became fascinated with the burgeoning culture of video games and the nascent internet, which provided a sanctuary from his struggles with social anxiety and the pressures of conformist society. As a teenager, Tatsuo's introversion deepened, leading him to adopt a hikikomori lifestyle, seldom leaving his room. However, this isolation sparked a transformation. He discovered the therapeutic effects of physical exercise, turning his confined space into a personal gym. Through bodybuilding, he found a new sense of control and confidence, contrasting sharply with his digital escapades. Though Tatsuo remains a recluse, his art serves as his voice, bridging the gap between his inner world and the outside, questioning societal norms while celebrating the beauty of solitude and self-discovery. In his pixelated landscapes, viewers find a digital haven, a place where nostalgia meets the personal narrative, and where every pixel tells a story of retreat, resilience, and rebirth." // Replace with actual default biography
    };

    // Include artwork details only if an artwork is selected
    const artworkDetails = selectedArtwork ? {
      title: selectedArtwork.title,
      description: selectedArtwork.description
    } : {};
    const newConversationHistory = [...conversationHistory, { role: "user", content: userInput }];

    try {
      const response = await fetch('/api/galleristBot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userInput,
          conversationHistory: newConversationHistory,
          ...artistDetails, // Always include artist details
          ...artworkDetails // Conditionally include artwork details
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      const updatedConversationHistory = [
        ...newConversationHistory, // This already includes the user's latest input
        { role: "assistant", content: data.reply } // Adding the chatbot's response
      ];

      setChatbotResponse(data.reply);
      setConversationHistory(updatedConversationHistory);
      setUserInput('');
    } catch (error) {
      console.error('Error sending input:', error);
    }
  };

  return (
    <div className={styles.galleryWrapper}>
      <h1>PURGATORY WORLD GALLERY</h1>
      <div className={styles["main-container"]}>
        <div className={styles["artwork-grid"]}>
          {artworks.map((artwork) => (
            <div 
              key={artwork.id} 
              className={styles["artwork-item"]} 
              style={{ backgroundImage: `url(${artwork.imageUrl})` }} 
              onClick={() => handleArtworkClick(artwork)}
              >
            </div>
          ))}
        </div>
        <div className={styles["chatContainer"]}>
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
      </div>
      {selectedArtwork && (
        <div className={styles["modal-overlay"]} onClick={() => setSelectedArtwork(null)}>
          <div className={styles["artwork-description"]}>
            <h2>{selectedArtwork.title}</h2>
            {/* Implement link to artist page here */}
            <p>Artist: {selectedArtwork.artist}</p>
            <p>{selectedArtwork.description}</p>
            {/* Add button or link for closing modal if needed */}
          </div>
          <div className={styles["artwork-display"]}>
            <img src={selectedArtwork.imageUrl} alt={selectedArtwork.title} />
          </div>
        </div>
      )}
      <div className={styles.chatBubble}>
        <p>{chatbotResponse}</p>
      </div>
      <div className={styles.avatar}></div>
    </div>
  );
};

export default GalleryPage;


