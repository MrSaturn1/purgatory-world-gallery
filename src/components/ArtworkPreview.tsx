import React from 'react';

interface ArtworkProps {
  imageUrl: string;
  artist: string;
  title: string;
  style?: React.CSSProperties;
}

const ArtworkPreview: React.FC<ArtworkProps> = ({ imageUrl, artist, title, style }) => {
  return (
    <div>
      <img src={imageUrl} alt={title} style={style} />
      <h2>{title}</h2>
      <p>By {artist}</p>
    </div>
  );
};

export default ArtworkPreview;
